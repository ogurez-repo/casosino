<script lang="ts">
  import { onDestroy } from "svelte";
  import { activityKinds, options, type ActivityOption } from "$lib/options";
  import SlotMachine from "$lib/components/slot/SlotMachine.svelte";
  import SpinResult from "$lib/components/slot/SpinResult.svelte";
  import OptionsPool from "$lib/components/slot/OptionsPool.svelte";
  import OptionPreviewModal from "$lib/components/slot/OptionPreviewModal.svelte";
  import SubmitReportModal from "$lib/components/slot/SubmitReportModal.svelte";
  const symbols = options.map((option) => `${option.icon} ${option.title}`);
  const missSymbol = "🪨 Пусто";
  const dropChance = 0.25;

  let isSpinning = $state(false);
  let handlePulled = $state(false);
  let reelSymbols = $state([symbols[0], symbols[1], symbols[2]]);
  let result = $state<ActivityOption | null>(null);
  let lastSpinMissed = $state(false);
  let selectedOption = $state<ActivityOption | null>(null);
  let selectedItems = $state<ActivityOption[]>([]);
  let isSubmitModalOpen = $state(false);

  let spinner: ReturnType<typeof setInterval> | null = null;

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));
  const randomIndex = (size: number) => Math.floor(Math.random() * size);
  const randomSymbol = () => symbols[randomIndex(symbols.length)];
  const randomOption = () => options[randomIndex(options.length)];

  const stopSpinner = () => {
    if (!spinner) {
      return;
    }

    clearInterval(spinner);
    spinner = null;
  };

  onDestroy(() => {
    stopSpinner();
  });

  const pullHandle = async () => {
    if (isSpinning) {
      return;
    }

    isSpinning = true;
    handlePulled = true;
    result = null;
    lastSpinMissed = false;

    spinner = setInterval(() => {
      reelSymbols = [randomSymbol(), randomSymbol(), randomSymbol()];
    }, 90);

    const didHit = Math.random() < dropChance;
    const winner = didHit ? randomOption() : null;
    const winnerSymbol = winner ? `${winner.icon} ${winner.title}` : missSymbol;

    await sleep(1250);
    reelSymbols = [randomSymbol(), randomSymbol(), winnerSymbol];
    await sleep(360);
    reelSymbols = [randomSymbol(), winnerSymbol, winnerSymbol];
    await sleep(420);
    reelSymbols = [winnerSymbol, winnerSymbol, winnerSymbol];

    stopSpinner();
    result = winner;
    lastSpinMissed = !didHit;
    isSpinning = false;

    setTimeout(() => {
      handlePulled = false;
    }, 180);
  };

  const handleOptionSelect = (option: ActivityOption) => {
    selectedOption = option;
  };

  const handleCloseModal = () => {
    selectedOption = null;
  };

  const toggleSelectedItem = (option: ActivityOption) => {
    const index = selectedItems.findIndex(
      (item) => item.title === option.title
    );
    if (index > -1) {
      selectedItems = selectedItems.filter((_, i) => i !== index);
    } else {
      selectedItems = [...selectedItems, option];
    }
  };

  const isItemSelected = (option: ActivityOption) => {
    return selectedItems.some((item) => item.title === option.title);
  };

  const clearSelected = () => {
    selectedItems = [];
  };

  const openSubmitModal = () => {
    isSubmitModalOpen = true;
  };

  const closeSubmitModal = () => {
    isSubmitModalOpen = false;
  };

  const handleSubmitReport = async () => {
    const report = {
      timestamp: new Date().toISOString(),
      items: selectedItems.map((item) => ({
        icon: item.icon,
        title: item.title,
        kind: item.kind,
        description: item.description,
      })),
    };

    console.log("Отчет отправлен:", report);
    console.log(
      "Для отправки по электронной почте Павлу, используйте эти данные:",
      JSON.stringify(report, null, 2)
    );

    try {
      // Отправляем в Telegram
      const response = await fetch("/api/send-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });

      const result = await response.json();

      if (result.success) {
        // Показываем сообщение об успешной отправке
        alert(
          `✓ Отчет успешно отправлен!\n\nВыбрано позиций: ${selectedItems.length}\n\nУведомление отправлено в Telegram.`
        );
      } else {
        alert(
          `✓ Данные сохранены!\n\nВыбрано позиций: ${selectedItems.length}\n\n(Telegram уведомление не настроено)`
        );
      }
    } catch (error) {
      console.error("Error sending report:", error);
      alert(
        `✓ Отчет готов!\n\nВыбрано позиций: ${selectedItems.length}\n\n(Проверьте наличие интернета)`
      );
    }

    // Очищаем выбор
    clearSelected();
    closeSubmitModal();
  };
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
    rel="stylesheet"
  />
  <title>Casino</title>
</svelte:head>

<main class="page">
  <div class="page-overlay"></div>

  <section class="machine-section">
    <SlotMachine
      {reelSymbols}
      {isSpinning}
      {handlePulled}
      onPull={pullHandle}
    />
    <SpinResult {result} {lastSpinMissed} />
  </section>

  {#if selectedItems.length > 0}
    <section class="selected-section">
      <div class="selected-header">
        <h2>Мой выбор ({selectedItems.length})</h2>
        <div class="header-buttons">
          <button class="submit-button" onclick={openSubmitModal} type="button">
            📨 Отправить Павлу
          </button>
          <button class="clear-button" onclick={clearSelected} type="button">
            Очистить
          </button>
        </div>
      </div>
      <div class="selected-list">
        {#each selectedItems as item (item.title)}
          <div class="selected-item">
            <div class="item-icon">{item.icon}</div>
            <div class="item-content">
              <p class="item-kind">{item.kind}</p>
              <h3>{item.title}</h3>
              <p class="item-desc">{item.description}</p>
            </div>
            <button
              class="remove-button"
              onclick={() => toggleSelectedItem(item)}
              type="button"
              aria-label="Удалить из выбора"
            >
              ✕
            </button>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <section class="pool-section">
    <OptionsPool
      kinds={activityKinds}
      {options}
      onOptionSelect={handleOptionSelect}
      {selectedItems}
    />
  </section>

  <OptionPreviewModal
    option={selectedOption}
    onClose={handleCloseModal}
    isSelected={selectedOption ? isItemSelected(selectedOption) : false}
    onToggleSelected={toggleSelectedItem}
  />

  <SubmitReportModal
    isOpen={isSubmitModalOpen}
    {selectedItems}
    onClose={closeSubmitModal}
    onSubmit={handleSubmitReport}
  />
</main>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: "VT323", monospace;
    color: #f4f8e8;
    background: linear-gradient(180deg, #74c6ff 0% 52%, #8ccc6f 52% 100%),
      radial-gradient(
        circle at 15% 10%,
        rgb(255 255 255 / 45%) 0 8%,
        transparent 8%
      ),
      radial-gradient(
        circle at 72% 16%,
        rgb(255 255 255 / 32%) 0 7%,
        transparent 7%
      );
    background-size:
      auto,
      170px 170px,
      130px 130px;
  }

  .page {
    position: relative;
    min-height: 100vh;
    padding: clamp(1rem, 2vw, 2rem) clamp(0.75rem, 2.5vw, 2rem)
      clamp(2rem, 3vw, 3rem);
    overflow: hidden;
  }

  .page-overlay {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        0deg,
        rgb(24 65 20 / 20%) 0 7px,
        rgb(24 65 20 / 20%) 7px 8px,
        transparent 8px 16px
      ),
      repeating-linear-gradient(
        90deg,
        rgb(24 65 20 / 20%) 0 7px,
        rgb(24 65 20 / 20%) 7px 8px,
        transparent 8px 16px
      );
    pointer-events: none;
  }

  .machine-section,
  .pool-section,
  .selected-section {
    position: relative;
    z-index: 1;
    width: min(1000px, 100%);
    margin: 0 auto;
  }

  .machine-section {
    text-align: center;
    margin-top: clamp(0.5rem, 2vh, 2rem);
  }

  .pool-section {
    margin-top: 1.5rem;
  }

  .selected-section {
    margin-top: 2.5rem;
    border: 6px solid #1b1408;
    background:
      linear-gradient(180deg, #48692d 0%, #2c421c 100%),
      repeating-linear-gradient(
        45deg,
        rgb(255 255 255 / 5%) 0 10px,
        rgb(0 0 0 / 18%) 10px 20px
      );
    padding: 1rem;
    box-shadow: 0 8px 0 #1b2811;
  }

  .selected-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 3px solid #1b2811;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .selected-header h2 {
    margin: 0;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.58rem, 1.4vw, 0.76rem);
    color: #d4e9bf;
    text-transform: uppercase;
    flex-grow: 1;
  }

  .header-buttons {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .submit-button {
    padding: 0.4rem 0.8rem;
    border: 3px solid #1b2811;
    background:
      linear-gradient(180deg, #48a866 0%, #2d6a42 100%),
      repeating-linear-gradient(
        90deg,
        rgb(255 255 255 / 8%) 0 6px,
        rgb(0 0 0 / 8%) 6px 12px
      );
    color: #fff;
    font-family: "Press Start 2P", monospace;
    font-size: 0.48rem;
    cursor: pointer;
    transition: all 120ms ease;
  }

  .submit-button:hover {
    filter: saturate(1.08) brightness(1.05);
  }

  .submit-button:active {
    transform: translateY(1px);
  }

  .clear-button {
    padding: 0.4rem 0.8rem;
    border: 3px solid #1b2811;
    background:
      linear-gradient(180deg, #d5b86a 0%, #8f6d30 100%),
      repeating-linear-gradient(
        90deg,
        rgb(255 255 255 / 8%) 0 6px,
        rgb(0 0 0 / 8%) 6px 12px
      );
    color: #1b1408;
    font-family: "Press Start 2P", monospace;
    font-size: 0.48rem;
    cursor: pointer;
    transition: filter 120ms ease;
  }

  .clear-button:hover {
    filter: saturate(1.05);
  }

  .clear-button:active {
    transform: translateY(1px);
  }

  .selected-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .selected-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.8rem;
    align-items: center;
    padding: 0.8rem;
    border: 3px solid #1b2811;
    background:
      linear-gradient(180deg, rgb(72 105 45 / 60%) 0%, rgb(44 66 28 / 60%) 100%);
    transition: background-color 120ms ease;
  }

  .selected-item:hover {
    background:
      linear-gradient(180deg, rgb(72 105 45 / 80%) 0%, rgb(44 66 28 / 80%) 100%);
  }

  .item-icon {
    width: 2.2rem;
    height: 2.2rem;
    display: grid;
    place-items: center;
    border: 2px solid #15100a;
    background: #c9a85f;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .item-content {
    min-width: 0;
  }

  .item-kind {
    margin: 0;
    font-family: "Press Start 2P", monospace;
    font-size: 0.4rem;
    text-transform: uppercase;
    color: #d4e9bf;
    letter-spacing: 0.05em;
  }

  .item-content h3 {
    margin: 0.2rem 0 0;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.52rem, 1.2vw, 0.68rem);
    line-height: 1.25;
    color: #f4f8e8;
  }

  .item-desc {
    margin: 0.2rem 0 0;
    font-size: 0.95rem;
    line-height: 1.1;
  }

  .remove-button {
    width: 2rem;
    height: 2rem;
    border: 3px solid #1b2811;
    background:
      linear-gradient(180deg, #d56161 0%, #8f3030 100%),
      repeating-linear-gradient(
        90deg,
        rgb(255 255 255 / 10%) 0 6px,
        rgb(0 0 0 / 10%) 6px 12px
      );
    color: #fff;
    font-family: "Press Start 2P", monospace;
    font-size: 1rem;
    cursor: pointer;
    transition: filter 120ms ease;
    flex-shrink: 0;
  }

  .remove-button:hover {
    filter: brightness(1.1);
  }

  .remove-button:active {
    transform: translateY(1px);
  }
</style>

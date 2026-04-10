<script lang="ts">
  import { onDestroy } from "svelte";
  import { activityKinds, options, type ActivityOption } from "$lib/options";
  import SlotMachine from "$lib/components/slot/SlotMachine.svelte";
  import SpinResult from "$lib/components/slot/SpinResult.svelte";
  import OptionsPool from "$lib/components/slot/OptionsPool.svelte";
  const symbols = options.map((option) => `${option.icon} ${option.title}`);
  const missSymbol = "🪨 Пусто";
  const dropChance = 0.25;

  let isSpinning = $state(false);
  let handlePulled = $state(false);
  let reelSymbols = $state([symbols[0], symbols[1], symbols[2]]);
  let result = $state<ActivityOption | null>(null);
  let lastSpinMissed = $state(false);

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

  <section class="pool-section">
    <OptionsPool kinds={activityKinds} {options} />
  </section>
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
  .pool-section {
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
</style>

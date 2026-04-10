<script lang="ts">
  import type { ActivityOption } from "$lib/options";

  let {
    isOpen = false,
    selectedItems = [],
    onClose,
    onSubmit,
  } = $props<{
    isOpen?: boolean;
    selectedItems?: ActivityOption[];
    onClose: () => void;
    onSubmit: () => void;
  }>();

  const handleBackdropClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };
</script>

{#if isOpen}
  <div class="modal-backdrop" onclick={onClose} role="presentation">
    <div
      class="modal-shell"
      role="dialog"
      aria-modal="true"
      aria-label="Отправить отчет"
      onclick={handleBackdropClick}
      onkeydown={handleKeyDown}
      tabindex="0"
    >
      <div class="modal-content">
        <h2 class="modal-title">Отправить отчет Павлу</h2>

        <div class="selection-list">
          <p class="list-label">Ваш выбор:</p>
          <ul class="items-list">
            {#each selectedItems as item (item.title)}
              <li>{item.icon} {item.title}</li>
            {/each}
          </ul>
        </div>

        <div class="warning-box">
          <p class="warning-text">
            Перед отправкой убедитесь, что выбор полностью соответствует Вашим вкусам. Если чего-то не хватает или Вы хотите что-то дополнительно то такие вопросы рассматриваются в персональном порядке в течение 1 рабочего дня. Также рекомендую держать в голове, что похавать в целом сходим в любом случае. При выборе от 3 позиций, часть мероприятий вероятно перенесется на следующую встречу в следствие достатка времени :(
          </p>
        </div>

        <div class="button-group">
          <button
            type="button"
            class="submit-button"
            onclick={handleSubmit}
          >
            ✓ Отправить отчет
          </button>
          <button type="button" class="cancel-button" onclick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 30;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgb(14 12 10 / 70%);
    backdrop-filter: blur(3px);
  }

  .modal-shell {
    width: min(750px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    border: 8px solid #1b1408;
    background:
      linear-gradient(180deg, #48692d 0%, #2c421c 100%),
      repeating-linear-gradient(
        45deg,
        rgb(255 255 255 / 5%) 0 10px,
        rgb(0 0 0 / 18%) 10px 20px
      );
    outline: none;
    box-shadow: 0 12px 0 #1b2811, 0 24px 36px rgb(0 0 0 / 50%);
  }

  .modal-content {
    padding: 1.2rem;
  }

  .modal-title {
    margin: 0 0 1rem;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.72rem, 2vw, 1rem);
    color: #d4e9bf;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 2px 2px 0 rgb(0 0 0 / 30%);
  }

  .selection-list {
    margin-bottom: 1.2rem;
    padding: 0.8rem;
    border: 4px solid #1b2811;
    background: linear-gradient(180deg, rgb(72 105 45 / 40%) 0%, rgb(44 66 28 / 40%) 100%);
  }

  .list-label {
    margin: 0 0 0.5rem;
    font-family: "Press Start 2P", monospace;
    font-size: 0.5rem;
    text-transform: uppercase;
    color: #d4e9bf;
    letter-spacing: 0.05em;
  }

  .items-list {
    margin: 0;
    padding-left: 1.2rem;
    list-style: none;
  }

  .items-list li {
    margin: 0.3rem 0;
    font-size: 1rem;
    line-height: 1.3;
  }

  .warning-box {
    margin-bottom: 1.2rem;
    padding: 0.9rem;
    border: 4px solid #4d402a;
    background:
      linear-gradient(180deg, rgb(122 107 71 / 35%) 0%, rgb(77 64 42 / 35%) 100%),
      repeating-linear-gradient(
        45deg,
        rgb(255 255 255 / 2%) 0 8px,
        rgb(0 0 0 / 5%) 8px 16px
      );
  }

  .warning-text {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #f4f8e8;
  }

  .button-group {
    display: flex;
    gap: 0.7rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .submit-button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.75rem 1.2rem;
    border: 4px solid #14100a;
    background:
      linear-gradient(180deg, #48a866 0%, #2d6a42 100%),
      repeating-linear-gradient(
        90deg,
        rgb(255 255 255 / 10%) 0 8px,
        rgb(0 0 0 / 10%) 8px 16px
      );
    box-shadow: 0 6px 0 #1b4428;
    color: #fff;
    font-family: "Press Start 2P", monospace;
    font-size: 0.62rem;
    cursor: pointer;
    transition: all 120ms ease;
    text-transform: uppercase;
  }

  .submit-button:hover {
    filter: saturate(1.1) brightness(1.08);
  }

  .submit-button:active {
    transform: translateY(2px);
    box-shadow: 0 4px 0 #1b4428;
  }

  .cancel-button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.75rem 1.2rem;
    border: 4px solid #14100a;
    background:
      linear-gradient(180deg, #8b5a5a 0%, #5a3a3a 100%),
      repeating-linear-gradient(
        90deg,
        rgb(255 255 255 / 10%) 0 8px,
        rgb(0 0 0 / 10%) 8px 16px
      );
    box-shadow: 0 6px 0 #3a2020;
    color: #f4f8e8;
    font-family: "Press Start 2P", monospace;
    font-size: 0.62rem;
    cursor: pointer;
    transition: all 120ms ease;
    text-transform: uppercase;
  }

  .cancel-button:hover {
    filter: brightness(1.08);
  }

  .cancel-button:active {
    transform: translateY(2px);
    box-shadow: 0 4px 0 #3a2020;
  }

  @media (max-width: 600px) {
    .modal-shell {
      max-height: 95vh;
    }

    .modal-content {
      padding: 1rem;
    }

    .button-group {
      flex-direction: column;
    }

    .submit-button,
    .cancel-button {
      width: 100%;
      justify-content: center;
    }
  }
</style>

<script lang="ts">
  import type { ActivityOption } from "$lib/options";

  let {
    option,
    onClose,
  } = $props<{
    option: ActivityOption | null;
    onClose: () => void;
  }>();
</script>

{#if option}
  <div class="modal-backdrop" onclick={onClose}>
    <div
      class="modal-shell"
      role="dialog"
      aria-modal="true"
      aria-label={`Вариант: ${option.title}`}
      onclick|stopPropagation
    >
      <article class="result modal-result">
        <div class="result-icon">{option.icon}</div>
        <div class="result-text">
          <p class="result-kind">{option.kind}</p>
          <h2>{option.title}</h2>
          <p>{option.description}</p>
        </div>
      </article>

      <button type="button" class="close-button" onclick={onClose}>
        Закрыть
      </button>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 20;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: rgb(14 12 10 / 62%);
    backdrop-filter: blur(2px);
  }

  .modal-shell {
    width: min(720px, 100%);
  }

  .modal-result {
    margin: 0;
  }

  .result {
    width: min(720px, 100%);
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8rem;
    align-items: center;
    padding: 0.8rem 0.95rem;
    border: 6px solid #1b1408;
    background:
      linear-gradient(180deg, #48692d 0%, #2c421c 100%),
      repeating-linear-gradient(
        45deg,
        rgb(255 255 255 / 5%) 0 10px,
        rgb(0 0 0 / 18%) 10px 20px
      );
    text-align: left;
    box-shadow:
      0 8px 0 #1b2811,
      0 18px 24px rgb(0 0 0 / 32%);
    animation: drop-in 220ms cubic-bezier(0.25, 1.15, 0.45, 1);
  }

  .result-icon {
    width: clamp(2.8rem, 8vw, 3.5rem);
    height: clamp(2.8rem, 8vw, 3.5rem);
    display: grid;
    place-items: center;
    border: 4px solid #15100a;
    background: #c9a85f;
    font-size: clamp(1.35rem, 3vw, 1.9rem);
  }

  .result-kind {
    margin: 0;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.44rem, 1vw, 0.56rem);
    text-transform: uppercase;
    color: #d4e9bf;
    letter-spacing: 0.07em;
  }

  .result h2 {
    margin: 0.35rem 0 0.2rem;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.64rem, 1.5vw, 0.88rem);
    line-height: 1.35;
  }

  .result p {
    margin: 0;
    font-size: clamp(1.1rem, 2.8vw, 1.35rem);
    line-height: 1.1;
  }

  .close-button {
    display: block;
    margin: 0.9rem auto 0;
    min-width: 11rem;
    padding: 0.65rem 1rem;
    border: 4px solid #14100a;
    background:
      linear-gradient(180deg, #d5b86a 0%, #8f6d30 100%),
      repeating-linear-gradient(
        90deg,
        rgb(255 255 255 / 10%) 0 8px,
        rgb(0 0 0 / 10%) 8px 16px
      );
    box-shadow: 0 5px 0 #4f3710;
    color: #1b1408;
    font-family: "Press Start 2P", monospace;
    font-size: 0.58rem;
    cursor: pointer;
  }

  .close-button:hover {
    filter: saturate(1.05);
  }

  .close-button:active {
    transform: translateY(1px);
    box-shadow: 0 4px 0 #4f3710;
  }

  @media (max-width: 560px) {
    .result {
      grid-template-columns: 1fr;
      justify-items: start;
    }
  }

  @keyframes drop-in {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>

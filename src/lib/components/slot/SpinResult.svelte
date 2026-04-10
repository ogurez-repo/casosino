<script lang="ts">
  import type { ActivityOption } from "$lib/options";

  let {
    result,
    lastSpinMissed,
  } = $props<{
    result: ActivityOption | null;
    lastSpinMissed: boolean;
  }>();
</script>

{#if result}
  <article class="result">
    <div class="result-icon">{result.icon}</div>
    <div class="result-text">
      <p class="result-kind">{result.kind}</p>
      <h2>{result.title}</h2>
      <p>{result.description}</p>
    </div>
  </article>
{:else if lastSpinMissed}
  <article class="result miss">
    <div class="result-icon">🪨</div>
    <div class="result-text">
      <p class="result-kind">промах</p>
      <h2>Ничего не выпало</h2>
      <p>Попробуй дернуть рычаг еще раз.</p>
    </div>
  </article>
{/if}

<style>
  .result {
    margin: 1.35rem auto 0;
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
    box-shadow: 0 8px 0 #1b2811;
    animation: drop-in 520ms cubic-bezier(0.25, 1.15, 0.45, 1);
  }

  .result.miss {
    background:
      linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 100%),
      repeating-linear-gradient(
        45deg,
        rgb(255 255 255 / 4%) 0 10px,
        rgb(0 0 0 / 24%) 10px 20px
      );
    box-shadow: 0 8px 0 #1a1a1a;
  }

  .result.miss .result-kind {
    color: #f1d9a1;
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

  @media (max-width: 560px) {
    .result {
      grid-template-columns: 1fr;
      justify-items: start;
    }
  }

  @keyframes drop-in {
    0% {
      transform: translateY(-26px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>

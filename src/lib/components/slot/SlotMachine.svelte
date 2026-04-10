<script lang="ts">
  let {
    reelSymbols,
    isSpinning,
    handlePulled,
    onPull,
  } = $props<{
    reelSymbols: string[];
    isSpinning: boolean;
    handlePulled: boolean;
    onPull: () => void;
  }>();
</script>

<h1 class="headline">Дерни рычаг, и выпадет план</h1>

<div class="slot-shell">
  <div class="beacon"></div>
  <div class="slot-machine">
    <div class="reel-row">
      {#each reelSymbols as symbol}
        <div class="reel {isSpinning ? 'reel-spinning' : ''}">
          <span>{symbol}</span>
        </div>
      {/each}
    </div>

    <button
      class="lever {handlePulled ? 'lever-pulled' : ''}"
      onclick={onPull}
      disabled={isSpinning}
      type="button"
      aria-label="Потянуть рычаг автомата"
    >
      <span class="lever-stick"></span>
      <span class="lever-top"></span>
      <span class="lever-base"></span>
    </button>
  </div>
</div>

<button class="spin-button" onclick={onPull} disabled={isSpinning} type="button">
  {isSpinning ? "Крутим..." : "Крутить автомат"}
</button>

<style>
  .headline {
    margin: 1.2rem auto 1.5rem;
    max-width: 26ch;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.88rem, 2.2vw, 1.42rem);
    line-height: 1.45;
    color: #10100d;
    text-shadow: 3px 3px 0 rgb(230 244 198 / 65%);
  }

  .slot-shell {
    position: relative;
    width: min(880px, 100%);
    margin: 0 auto;
  }

  .beacon {
    position: absolute;
    top: -1.7rem;
    left: 50%;
    width: clamp(10rem, 48vw, 28rem);
    height: 5rem;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      rgb(160 246 255 / 0%) 0%,
      rgb(160 246 255 / 34%) 40%,
      rgb(160 246 255 / 0%) 100%
    );
    filter: blur(1px);
    pointer-events: none;
  }

  .slot-machine {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: clamp(0.5rem, 2vw, 1.35rem);
    padding: clamp(0.8rem, 2vw, 1.15rem) clamp(0.8rem, 2.2vw, 1.25rem);
    border: 8px solid #29180d;
    background:
      linear-gradient(180deg, #6f4323 0%, #432812 100%),
      repeating-linear-gradient(
        45deg,
        rgb(255 255 255 / 6%) 0 11px,
        rgb(0 0 0 / 10%) 11px 22px
      );
    box-shadow:
      0 14px 0 #241408,
      0 26px 25px rgb(0 0 0 / 32%);
  }

  .reel-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(0.35rem, 1vw, 0.75rem);
  }

  .reel {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: clamp(3.5rem, 11vw, 5.2rem);
    padding: 0.35rem 0.45rem;
    border: 6px solid #505050;
    background:
      linear-gradient(180deg, #262626 0%, #121212 100%),
      repeating-linear-gradient(
        0deg,
        rgb(255 255 255 / 3%) 0 5px,
        rgb(0 0 0 / 22%) 5px 10px
      );
    box-shadow: inset 0 0 0 3px #171717;
  }

  .reel span {
    display: block;
    width: 100%;
    max-width: 19ch;
    margin: 0 auto;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.48rem, 1.28vw, 0.72rem);
    color: #ffea8c;
    line-height: 1.4;
    text-shadow: 2px 2px 0 #060606;
    text-align: center;
    overflow-wrap: anywhere;
  }

  .reel-spinning span {
    animation: jitter 120ms steps(2) infinite;
  }

  .lever {
    position: relative;
    width: clamp(3.1rem, 7vw, 4.3rem);
    height: clamp(7.2rem, 18vw, 10rem);
    border: 0;
    background: transparent;
    cursor: pointer;
    transform-origin: center top;
    transition: transform 0.18s ease;
  }

  .lever:disabled {
    cursor: wait;
  }

  .lever-stick {
    position: absolute;
    top: 0.8rem;
    left: 50%;
    width: 0.56rem;
    height: calc(100% - 2.35rem);
    transform: translateX(-50%);
    background: linear-gradient(180deg, #9d9d9d 0%, #646464 100%);
    border: 3px solid #2b2b2b;
    box-sizing: border-box;
  }

  .lever-top {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1.7rem;
    height: 1.7rem;
    transform: translateX(-50%);
    border: 3px solid #2f1206;
    background:
      radial-gradient(circle at 35% 28%, #ffddb5 0 20%, transparent 22%),
      linear-gradient(180deg, #ff8a4d 0%, #cf4c1e 100%);
    box-shadow: 0 0 0 3px rgb(46 16 7 / 38%);
    box-sizing: border-box;
  }

  .lever-base {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 2.15rem;
    height: 1.35rem;
    transform: translateX(-50%);
    border: 3px solid #181818;
    background: linear-gradient(180deg, #676767 0%, #313131 100%);
    box-sizing: border-box;
  }

  .lever-pulled {
    transform: translateY(0.42rem) rotate(12deg);
  }

  .spin-button {
    margin-top: 1.4rem;
    min-width: min(100%, 16rem);
    padding: 0.85rem 1.2rem;
    border: 4px solid #14100a;
    background:
      linear-gradient(180deg, #d5b86a 0%, #8f6d30 100%),
      repeating-linear-gradient(
        90deg,
        rgb(255 255 255 / 10%) 0 8px,
        rgb(0 0 0 / 10%) 8px 16px
      );
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.54rem, 1.2vw, 0.68rem);
    text-transform: uppercase;
    color: #1b1408;
    cursor: pointer;
    box-shadow: 0 6px 0 #4f3710;
    transition:
      transform 0.12s ease,
      box-shadow 0.12s ease,
      filter 0.2s ease;
  }

  .spin-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 0 #4f3710;
    filter: saturate(1.05);
  }

  .spin-button:active:not(:disabled) {
    transform: translateY(2px);
    box-shadow: 0 4px 0 #4f3710;
  }

  .spin-button:disabled {
    cursor: wait;
    opacity: 0.72;
  }

  @media (max-width: 900px) {
    .slot-machine {
      grid-template-columns: 1fr;
      justify-items: center;
    }

    .reel-row {
      width: 100%;
    }

    .lever {
      margin-top: 0.15rem;
      height: 7.6rem;
    }
  }

  @media (max-width: 560px) {
    .reel-row {
      grid-template-columns: 1fr;
    }

    .reel {
      min-height: 3.2rem;
    }
  }

  @keyframes jitter {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(2px);
      opacity: 0.85;
    }
    100% {
      transform: translateY(-2px);
      opacity: 1;
    }
  }
</style>

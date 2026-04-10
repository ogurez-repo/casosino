<script lang="ts">
  import type { ActivityKind, ActivityOption } from "$lib/options";

  let {
    kinds,
    options,
    onOptionSelect,
    selectedItems = [],
  } = $props<{
    kinds: ActivityKind[];
    options: ActivityOption[];
    onOptionSelect: (option: ActivityOption) => void;
    selectedItems?: ActivityOption[];
  }>();

  const isSelected = (option: ActivityOption) => {
    return selectedItems.some((item) => item.title === option.title);
  };
</script>

<h2>Возможные выпадения</h2>
<div class="pool-grid">
  {#each kinds as kind}
    <div class="pool-card">
      <h3>{kind}</h3>
      <ul>
        {#each options.filter((option: ActivityOption) => option.kind === kind) as option}
          <li>
            <button
              type="button"
              class="pool-option"
              class:selected={isSelected(option)}
              onclick={() => onOptionSelect(option)}
            >
              {isSelected(option) ? "✓" : "•"} {option.icon} {option.title}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style>
  h2 {
    margin: 0 0 0.85rem;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.64rem, 1.6vw, 0.86rem);
    color: #1d1609;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 0 2px 0 rgb(255 255 255 / 35%);
  }

  .pool-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(0.58rem, 1.4vw, 0.9rem);
  }

  .pool-card {
    border: 5px solid #181109;
    background:
      linear-gradient(180deg, #4a341b 0%, #2d1d0d 100%),
      repeating-linear-gradient(
        0deg,
        rgb(255 255 255 / 5%) 0 7px,
        rgb(0 0 0 / 9%) 7px 14px
      );
    padding: 0.68rem 0.75rem 0.85rem;
    box-shadow: 0 7px 0 #201507;
  }

  .pool-card h3 {
    margin: 0 0 0.5rem;
    font-family: "Press Start 2P", monospace;
    font-size: clamp(0.5rem, 1.1vw, 0.62rem);
    line-height: 1.45;
    text-transform: uppercase;
    color: #f5d87f;
  }

  .pool-card ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
    font-size: clamp(1.05rem, 2.5vw, 1.25rem);
  }

  .pool-card li + li {
    margin-top: 0.18rem;
  }

  .pool-option {
    width: 100%;
    padding: 0.22rem 0.28rem;
    border: 2px solid transparent;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition:
      transform 120ms ease,
      border-color 120ms ease,
      background-color 120ms ease;
  }

  .pool-option:hover {
    transform: translateX(3px);
    border-color: rgb(245 216 127 / 70%);
    background: rgb(245 216 127 / 10%);
  }

  .pool-option:focus-visible {
    outline: none;
    border-color: #f5d87f;
    background: rgb(245 216 127 / 16%);
  }

  .pool-option.selected {
    border-color: rgb(169 223 142 / 100%);
    background: rgb(169 223 142 / 22%);
    color: #d4e9bf;
  }

  .pool-option.selected:hover {
    background: rgb(169 223 142 / 32%);
  }

  @media (max-width: 900px) {
    .pool-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

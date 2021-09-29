<script lang="ts">
  import data from "../data.json";
  import TimeCard from "./lib/TimeCard.svelte";
  import UserCard from "./lib/UserCard.svelte";

  $: cards = data.map((card) => ({
    ...card,
    type: card.title.toLowerCase().replaceAll(/\s/gm, "-") as any,
    headerIcon: `assets/icons/icon-${card.title
      .toLowerCase()
      .replaceAll(/\s/gm, "-")}.svg`,
  }));
</script>

<main>
  <div class="grid">
    <div class="profile"><UserCard /></div>
    {#each cards as card}
      <TimeCard title={card.title} type={card.type} timeframe={card.timeframes}>
        <img
          slot="headerIcon"
          src={card.headerIcon}
          aria-hidden="true"
          alt=""
        />
      </TimeCard>
    {/each}
  </div>
</main>

<style type="text/scss">
  :root {
    font-family: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #fff;
  }

  main {
    background-color: hsl(226, 43%, 10%);
    min-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 0;

    & > .grid {
      display: grid;
      grid-template-columns: repeat(4, 250px);
      gap: 16px;

      & .profile {
        grid-row: 1 / span 2;
      }

      @media (max-width: 1199.98px) {
        grid-template-columns: repeat(3, 250px);
      }

      @media (max-width: 991.98px) {
        grid-template-columns: repeat(2, 250px);
      }

      @media (max-width: 767.98px) {
        grid-template-columns: repeat(1, 80vw);
        & .profile {
          grid-row: 1 / 1;
        }
      }
    }
  }
</style>

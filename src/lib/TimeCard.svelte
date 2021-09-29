<script lang="ts">
  import { AvailableTimeframe, selectedTimeframe } from "../store/timeframe";

  type TimeFrame = {
    daily: { current: number; previous: number };
    weekly: { current: number; previous: number };
    monthly: { current: number; previous: number };
  };
  type CardType =
    | "work"
    | "play"
    | "study"
    | "exercise"
    | "social"
    | "self-care";

  export let title: string;
  export let type: CardType;

  export let timeframe: TimeFrame;
  export let selectedTimeframe_value: AvailableTimeframe;

  const unsub = selectedTimeframe.subscribe((value) => {
    selectedTimeframe_value = value;
  });

  console.log(selectedTimeframe);

  const getCardColor = (type: CardType) => {
    switch (type) {
      case "work":
        return "orange";
      case "play":
        return "cyan";
      case "study":
        return "red";
      case "exercise":
        return "green";
      case "social":
        return "purple";
      case "self-care":
        return "yellow";

      default:
        return "blue";
    }
  };

  $: cssVarStyles = `--card-header-background: var(--primary-${getCardColor(
    type
  )})`;

  function getPreviousText(val: AvailableTimeframe) {
    switch (val) {
      case "daily":
        return `Yesterday - ${timeframe[val].previous}hrs`;
      case "monthly":
        return `Last Month - ${timeframe[val].previous}hrs`;
      case "weekly":
        return `Last Week - ${timeframe[val].previous}hrs`;
    }
  }
</script>

<div class="card" style={cssVarStyles}>
  <div class="card__header">
    <div class="card__header__icon">
      <slot name="headerIcon" />
    </div>
  </div>
  <div class="card__body">
    <div class="card__body__title-container">
      <h3 class="card__body__title">{title}</h3>
      <svg
        class="card__body__more"
        width="21"
        height="5"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
          fill="#BBC0FF"
          fill-rule="evenodd"
        /></svg
      >
    </div>
    <div class="card__body__time-container">
      <p class="card__body__current-time">
        {timeframe[selectedTimeframe_value].current}hrs
      </p>
      <p class="card__body__previous-time">
        {getPreviousText(selectedTimeframe_value)}
      </p>
    </div>
  </div>
</div>

<style type="scss">
  .card {
    background-color: var(--dark-blue);
    border-radius: var(--default-border-radius);
    display: flex;
    flex-direction: column;

    &:hover {
      background-color: var(--light-blue);
    }

    &__header {
      width: 100%;
      border-top-right-radius: var(--default-border-radius);
      border-top-left-radius: var(--default-border-radius);
      background-color: var(--card-header-background);
      overflow: hidden;
      &__icon {
        margin-top: -3px;
        padding-right: 8px;
        float: right;
        height: 50px;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      margin-top: -8px;
      background-color: var(--dark-blue);
      border-radius: var(--default-border-radius);
      width: 100%;
      padding: 24px;
      cursor: pointer;

      &:hover {
        background-color: var(--light-blue);
      }

      &__title-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__title {
        font-size: 1.125rem;
        font-weight: 300;
      }

      &__more:hover {
        cursor: pointer;
        & path {
          fill: #fff;
        }
      }

      &__current-time {
        margin: 24px 0 8px;
        line-height: 100%;
        font-size: 3rem;
        font-weight: 300;
      }

      &__previous-time {
        /* margin: 24px 0 8px; */
        line-height: 100%;
        font-size: 0.875rem;
        font-weight: 300;
        color: var(--lighter-blue);
      }
    }
  }
  @media (max-width: 767.98px) {
    .card {
      &__body {
        &__time-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        &__current-time {
          font-size: 2rem;
          margin: 0;
        }
      }
    }
    /* .card {
      width: 80vw;
    }
    .profile {
      flex-direction: row;
      align-items: center;

      &__image {
        height: 80px;
        margin-right: 8px;
      }

      &__subtitle {
        font-size: 0.875rem;
        font-weight: 300;
        color: var(--lighter-blue);
        margin-top: 0;
      }

      &__name {
        font-size: 1.5rem;
        line-height: 120%;
        font-weight: 300;
      }
    }

    .reminder {
      &__list {
        display: flex;
        justify-content: space-between;
      }
    } */
  }
</style>

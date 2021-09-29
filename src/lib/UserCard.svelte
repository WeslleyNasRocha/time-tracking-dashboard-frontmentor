<script lang="ts">
  import { AvailableTimeframe, selectedTimeframe } from "../store/timeframe";

  let selected_value;

  const unsub = selectedTimeframe.subscribe((value) => {
    selected_value = value;
  });

  const isSelected = (val: AvailableTimeframe, name: string) =>
    selected_value === name ? "reminder__item--active" : "";

  const setSelected = (name: AvailableTimeframe) => () => {
    selectedTimeframe.set(name);
  };
</script>

<div class="card">
  <div class="profile">
    <img
      class="profile__image"
      src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Blue03&eyeType=Wink&eyebrowType=UpDown&mouthType=Twinkle&skinColor=Brown"
      alt="Avatar"
    />
    <div class="profile__info">
      <p class="profile__subtitle">Report for</p>
      <h2 class="profile__name">Jeremy Robson</h2>
    </div>
  </div>
  <div class="reminder">
    <ul class="reminder__list">
      <li
        class={`reminder__item ${isSelected(selected_value, "daily")}`}
        on:click={setSelected("daily")}
      >
        Daily
      </li>
      <li
        class={`reminder__item ${isSelected(selected_value, "weekly")}`}
        on:click={setSelected("weekly")}
      >
        Weekly
      </li>
      <li
        class={`reminder__item ${isSelected(selected_value, "monthly")}`}
        on:click={setSelected("monthly")}
      >
        Monthly
      </li>
    </ul>
  </div>
</div>

<style type="scss">
  .card {
    background-color: var(--dark-blue);
    border-radius: var(--default-border-radius);
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .profile {
    background-color: var(--primary-blue);
    border-radius: var(--default-border-radius);
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &__image {
      height: 100px;
    }

    &__subtitle {
      font-size: 0.875rem;
      font-weight: 300;
      color: var(--lighter-blue);
      margin-top: 32px;
    }

    &__name {
      font-size: 2.5rem;
      line-height: 120%;
      font-weight: 300;
    }
  }

  .reminder {
    padding: 16px;
    &__list {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 8px;
    }

    &__item {
      font-weight: 300;
      font-size: 1rem;
      color: var(--lighter-blue);
      cursor: pointer;
      width: min-content;

      &:hover {
        color: var(--light-blue);
      }

      &--active {
        color: #fff !important;
        font-weight: 400 !important;
      }
    }
  }
  @media (max-width: 767.98px) {
    .card {
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
    }
  }
</style>

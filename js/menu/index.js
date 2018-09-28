/**
 * Manages the menu in entirety. Will automatically refresh.
 * @author Johan Svensson
 */
class Menu {
  /**
   * @param {string} selector 
   */
  constructor(selector) {
    this.$element = $(selector).html(`<div id="task-indicator">`);
  
    this.autoFetchIntervalId = setInterval(() => this.fetchIfOutdated(), 1000);
  }

  fetchIfOutdated() {
    let now = new Date();
    let { prevFetchAt } = this;

    if (prevFetchAt && now.getDay() == 1 && prevFetchAt.getDay() > now.getDay()) {
      //  Passed to new week
      this.fetch();
    }
  }

  /**
   * Fetches the menu.
   */
  async fetch() {
    this.prevFetchAt = new Date();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        $.getJSON(`${config.baseUrl}/teknikum_menu`, d => {
          this.appendFromResult(d);
          resolve();
        })
      }, config.mockDelay);
    })
  }

  /**
   * Appends daily menu children from a data result set.
   */
  appendFromResult(data) {
    this.appendMetadata(data);

    data.meals.forEach((m, i) => new MenuItem(m, i + 1).appendTo(this.$element));
  }

  appendMetadata(data) {
  }
}

/**
 * Represents a daily menu item.
 * @author Johan Svensson
 */
class MenuItem {
  /**
   * @param {MenuItemData} data 
   * @param {number} dayOfWeek
   */
  constructor(data, dayOfWeek) {
    this.data = data;
    this.dayOfWeek = dayOfWeek;
  }

  appendTo($parent) {
    let { data } = this;

    let isToday = this.dayOfWeek == config.currentDayOfWeek;

    $parent.append(
      this.$element = $(`<article style="animation-delay: ${this.dayOfWeek * 100}ms">`)
      .append(
        $(`<i class="material-icons like">thumb_up</i>`)
      ).append(
        $(`<h3 class="day">`).text(data.day)
      ).append(
        $(`<p class="dish">`).text(data.dish)
      ).append(
        $(`<div class="hr">`)
      ).append(
        $(`<p class="alt-dish">`).text(data.alt_dish)
      ).toggleClass('today', isToday)
    );

    if (isToday) {
      //  Scroll to this
      setTimeout(() => this.scrollTo(), 500);
    }
  }

  /**
   * Scrolls the document to view this.
   */
  scrollTo(duration = 450) {
    let { $element } = this;

    let bounds = $element[0].getBoundingClientRect();
    const to = bounds.top;

    $('html, body').stop().animate({ scrollTop: to }, 150 * this.dayOfWeek);
  }
}

class MenuItemData {
  /**
   * @param {"Måndag"|"Tisdag"|"Onsdag"|"Torsdag"|"Fredag"|"Lördag"|"Söndag"} day
   * @param {string} dish
   * @param {string} alt_dish
   */
  constructor(day, dish, alt_dish) {
    this.day = day;
    this.dish = dish;
    this.alt_dish = alt_dish;
  }
}
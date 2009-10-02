Object.extend(Date.prototype, {

  isSameDay: function(other) {
    return this.getFullYear() == other.getFullYear()
      && this.getMonth() == other.getMonth()
      && this.getDate() == other.getDate();
  },

  SIX_HOURS: 6 * 60,
  ONE_DAY: 24 * 60,
  ONE_MONTH: 30 * 24 * 60,
  TWO_MONTHS: 2 * 30 * 24 * 60,
  ONE_YEAR: 365 * 24 * 60,
  EIGHTEEN_MONTHS: 18 * 30 * 24 * 60,

  _relativeTimeInWordsForToday: function(delta, formatter) {
    if (delta == 0) return formatter("less than a minute");
    if (delta == 1) return formatter("1 minute");
    if (delta < 45) return formatter(delta + " minutes");
    if (delta < 90) return formatter("about 1 hour");
    if (delta < this.SIX_HOURS) return formatter("about " + (delta / 60).round() + " hours");
    return "today";
  },

  _relativeTimeInWordsForFuture: function(delta, formatter) {
    if (delta < this.ONE_DAY) return "yesterday";
    if (delta < this.ONE_MONTH) return formatter((delta / this.ONE_DAY).ceil() + " days");
    if (delta < this.TWO_MONTHS) return formatter("about 1 month");
    if (delta < this.ONE_YEAR) return formatter((delta / this.ONE_MONTH).round() + " months");
    if (delta < this.EIGHTEEN_MONTHS) return formatter("about 1 year");
    return formatter("about " + (delta / this.ONE_YEAR).round() + " years");
  },

  relativeTimeInWords: function(baseDate) {
    var formatter = this <= baseDate ? function(text) {return text + " ago";} : function(text) {return "in " + text;};
    var delta = Math.abs((baseDate - this) / 60000).round();
    if (baseDate.isSameDay(this)) {
      return this._relativeTimeInWordsForToday(delta, formatter);
    } else {
      return this._relativeTimeInWordsForFuture(delta, formatter);
    }
  }
});

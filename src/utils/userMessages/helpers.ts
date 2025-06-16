export const joinClasses = (...classNames: Array<string | undefined | false>): string =>
  classNames.filter(className => className).join(' ')

import mousetrap from "mousetrap";

/**
 * @typedef {Object} ShortcutProps
 * @property {string | string[]} key
 * @property {(data: unknown) => void} callback
 */

/**
 * @param {ShortcutProps[]} props
 * @returns {() => void} unsubscribe
 */
export function shortcuts(props) {
  const events = props.filter(({ callback }) => callback);

  for (const { key, callback } of events) {
    mousetrap.bind(key, callback);
  }

  return () => {
    for (const { key } of events) {
      mousetrap.unbind(key);
    }
  };
}

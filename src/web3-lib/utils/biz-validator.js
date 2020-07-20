
/**
 * xxx @126
 * only valid prefix
 * 不含 ~!#$%^&*()/\|,<>?"'();:+=[]{} 或 空格
 * @param {*} prefix
 */
export function BMailAccountIllegal(prefix) {
  if (typeof prefix === 'undefined') return true;
  return /[~!#$%^&*()\/\\|,<>?"'();:+=\[\]{} ]/.test(prefix)
}

export default {
  BMailAccountIllegal
}

import fs from 'fs-extra'

const copyPlugin = options => ({
	ongenerate: () => fs.copySync(options.src, options.dest),
})

export default copyPlugin

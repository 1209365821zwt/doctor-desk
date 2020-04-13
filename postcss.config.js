module.exports = ({
    file
}) => {
    let remUnit
    if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
        remUnit = 50
    } else {
        remUnit = 100
    }
    return {
        plugins: {
            'autoprefixer': {
                overrideBrowserslist: [
                    'Android 4.1',
                    'iOS 7.1',
                    'Chrome > 31',
                    'ff > 31',
                    'ie >= 8'
                ]
            },
            'postcss-pxtorem': {
                rootValue: remUnit,
                propList: ['*']
            }
        }
    }
}
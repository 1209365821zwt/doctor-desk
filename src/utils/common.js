/**
 * 数组与对象深拷贝
 * @param obj 
 * @returns {Boolean}
 */
export function deepClone(obj) {
    if (obj === null) return null;
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (typeof obj !== "object") return obj;
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === "object" && obj[key] != null ? deepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}

/**
 * 获取姓氏
 * @param fullname {string}   
 * @param return [firstname, lastname]    
 */
export const getFirstName = (fullname) => {
    let hyphenated = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人',
        '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政', '濮阳', '公冶',
        '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '城池', '司徒',
        '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官', '司寇', '巫马', '公西', '颛孙',
        '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐',
        '段干', '百里', '呼延', '东郭', '南门', '羊舌', '微生', '公户', '公玉', '公仪',
        '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖',
        '第五', '公乘', '贯丘', '公皙', '南荣', '东里', '东宫', '仲长', '子书', '子桑',
        '即墨', '达奚', '褚师'
    ];
    let hyset = new Set(hyphenated);
    let vLength = fullname.length;
    // 前为姓,后为名  
    let lastname = '',
        firstname = '';
    if (vLength > 2) {
        const preTwoWords = fullname.substr(0, 2);
        // 取命名的前两个字,看是否在复姓库中    
        if (hyset.has(preTwoWords)) {
            firstname = preTwoWords;
            lastname = fullname.substr(2);
        } else {
            firstname = fullname.substr(0, 1);
            lastname = fullname.substr(1);
        }
    } else if (vLength === 2) {
        // 全名只有两个字时,以前一个为姓,后一下为名    
        firstname = fullname.substr(0, 1);
        lastname = fullname.substr(1);
    } else {
        firstname = fullname;
    }
    return [firstname, lastname];
};
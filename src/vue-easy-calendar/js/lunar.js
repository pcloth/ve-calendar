
/*****************************************************************************
                                   日期资料
*****************************************************************************/
var lunarInfo = new Array(
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63);

var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
var nStr2 = new Array('初', '十', '廿', '卅', '□');
var monthName = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
var monthChinese = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月");

//国历节日 *表示放假日
var sFtv = new Array(
    "0101*元旦节",
    "0202 世界湿地日",
    "0210 气象节",
    "0214 情人节",
    "0301 海豹日",
    "0303 全国爱耳日",
    "0305 学雷锋纪念日",
    "0308 妇女节",
    "0312 植树节 孙中山逝世纪念日",
    "0314 警察日",
    "0315 消费者权益日",
    "0317 中国国医节 航海日",
    "0321 世界森林日 消除种族歧视日 世界儿歌日",
    "0322 世界水日",
    "0323 世界气象日",
    "0324 世界防治结核病日",
    "0325 全国中小学生安全教育日",
    "0330 巴勒斯坦国土日",
    "0401 愚人节 全国爱国卫生运动月(四月) 税收宣传月(四月)",
    "0407 世界卫生日",
    "0422 世界地球日",
    "0423 世界图书和版权日",
    "0424 亚非新闻工作者日",
    "0501*劳动节",
    "0502*劳动节假日",
    "0503*劳动节假日",
    "0504 青年节",
    "0505 碘缺乏病防治日",
    "0508 世界红十字日",
    "0512 护士节",
    "0515 家庭日",
    "0517 电信日",
    "0518 博物馆日",
    "0520 全国学生营养日",
    "0523 牛奶日",
    "0531 世界无烟日",
    "0601 儿童节",
    "0605 世界环境保护日",
    "0606 全国爱眼日",
    "0617 防治荒漠化和干旱日",
    "0623 奥林匹克日",
    "0625 全国土地日",
    "0626 禁毒日",
    "0701 香港回归纪念日 中共诞辰 世界建筑日",
    "0702 体育记者日",
    "0707 抗日战争纪念日",
    "0711 世界人口日",
    "0730 非洲妇女日",
    "0801 建军节",
    "0808 中国男子节(爸爸节)",
    "0815 抗日战争胜利纪念",
    "0908 扫盲日 新闻工作者日",
    "0909 毛泽东逝世纪念",
    "0910 中国教师节",
    "0914 世界清洁地球日",
    "0916 臭氧层保护日",
    "0918 九·一八事变纪念日",
    "0920 爱牙日",
    "0927 世界旅游日",
    "0928 孔子诞辰",
    "1001*国庆节 世界音乐日 老人节",
    "1002*国庆节假日 和平与民主自由斗争日",
    "1003*国庆节假日",
    "1004 世界动物日",
    "1006 老人节",
    "1008 全国高血压日 世界视觉日",
    "1009 世界邮政日 万国邮联日",
    "1010 辛亥革命纪念日 世界精神卫生日",
    "1013 世界保健日 教师节",
    "1014 世界标准日",
    "1015 盲人节(白手杖节)",
    "1016 世界粮食日",
    "1017 世界消除贫困日",
    "1022 世界传统医药日",
    "1024 联合国日",
    "1031 世界勤俭日",
    "1107 十月社会主义革命纪念日",
    "1108 中国记者日",
    "1109 全国消防安全宣传教育日",
    "1110 世界青年节",
    "1111 科学与和平周(本日所属的一周)",
    "1112 孙中山诞辰纪念日",
    "1114 世界糖尿病日",
    "1117 大学生节 世界学生节",
    "1120*彝族年",
    "1121*彝族年 世界问候日 世界电视日",
    "1122*彝族年",
    "1129 声援巴勒斯坦人民日",
    "1201 世界艾滋病日",
    "1203 世界残疾人日",
    "1205 经济和社会发展志愿人员日",
    "1208 儿童电视日",
    "1209 世界足球日",
    "1210 世界人权日",
    "1212 西安事变纪念日",
    "1213 南京大屠杀(1937年)纪念日！紧记血泪史！",
    "1220 澳门回归纪念",
    "1221 篮球日",
    "1224 平安夜",
    "1225 圣诞节",
    "1226 毛泽东诞辰纪念")

//农历节日 *表示放假日
var lFtv = new Array(
    "0101*春节",
    "0102*初二",
    "0103*初三",
    "0115 元宵节",
    "0505*端午节",
    // "0506*端午假",
    // "0507*端午假",
    "0707 七夕情人节",
    "0715 中元节",
    "0815 中秋节",
    "0909 重阳节",
    "1208 腊八节",
    "1223 小年",
    "0100 除夕")

//某月的第几个星期几
var wFtv = new Array(
    "0150 世界麻风日", //一月的最后一个星期日（月倒数第一个星期日）
    "0520 母亲节",
    "0530 全国助残日",
    "0630 父亲节",
    "0730 被奴役国家周",
    "0932 和平日",
    "0940 聋人节 世界儿童日",
    "0950 世界海事日",
    "1011 住房日",
    "1013 减灾日",
    "1144 感恩节")


/*****************************************************************************
日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    return (sum + leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    else return (0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
    return (lunarInfo[y - 1900] & 0xf);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y, m) {
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}


//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

    var i, leap = 0, temp = 0;
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2050 && offset > 0; i++) { temp = lYearDays(i); offset -= temp; }

    if (offset < 0) { offset += temp; i--; }

    this.year = i;

    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;

    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && this.isLeap == false) { --i; this.isLeap = true; temp = leapDays(this.year); }
        else { temp = monthDays(this.year, i); }

        //解除闰月
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;

        offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap) { this.isLeap = false; }
        else { this.isLeap = true; --i; }

    if (offset < 0) { offset += temp; --i; }

    this.month = i;
    this.day = offset + 1;
}

//==============================返回公历 y年某m+1月的天数
function solarDays(y, m) {
    if (m == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    else
        return (solarMonth[m]);
}
//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
    return (Gan[num % 10] + Zhi[num % 12]);
}

//============================== 阴历属性
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {

    this.isToday = false;
    //阳历
    this.sYear = sYear;   //公元年4位数字
    this.sMonth = sMonth;  //公元月数字
    this.sDay = sDay;    //公元日数字
    this.week = week;    //星期, 1个中文
    
    //农历
    this.lYear = lYear;   //公元年4位数字
    this.lMonth = lMonth;  //农历月数字
    this.lMonthChinese = monthChinese[lMonth-1]
    this.lDay = lDay;    //农历日数字
    this.isLeap = isLeap;  //是否为农历闰月?
    this.lDayChinese = lDayToChinese(lDay)
    //八字
    this.cYear = cYear;   //年柱, 2个中文
    this.cMonth = cMonth;  //月柱, 2个中文
    this.cDay = cDay;    //日柱, 2个中文

    this.color = '';

    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = ''; //节气

    if (`${sMonth}`.length == 1) sMonth = `0${sMonth}`;
    if (`${sDay}`.length == 1) sDay = `0${sDay}`;
    this.sDate = `${sYear}-${sMonth}-${sDay}`
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate());
}




//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

OBJ.length      返回当月最大日
OBJ.firstWeek   返回当月一日星期

由 OBJ[日期].属性名称 即可取得各项值

OBJ[日期].isToday  返回是否为今日 true 或 false

其他 OBJ[日期] 属性参见 calElement() 中的注解
*/
function calendar(y, m) {

    var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2, tmp3;
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;

    sDObj = new Date(y, m, 1, 0, 0, 0, 0);    //当月一日日期

    this.length = solarDays(y, m);    //公历当月天数
    this.firstWeek = sDObj.getDay();    //公历当月1日星期几

    ////////年柱 1900年立春后为庚子年(60进制36)
    if (m < 2) cY = cyclical(y - 1900 + 36 - 1);
    else cY = cyclical(y - 1900 + 36);
    var term2 = sTerm(y, 2); //立春日期

    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = sTerm(y, m * 2) //返回当月「节」为几日开始
    cM = cyclical((y - 1900) * 12 + m + 12);

    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

    for (var i = 0; i < this.length; i++) {

        if (lD > lX) {
            sDObj = new Date(y, m, i + 1);    //当月一日日期
            lDObj = new Lunar(sDObj);     //农历
            lY = lDObj.year;           //农历年
            lM = lDObj.month;          //农历月
            lD = lDObj.day;            //农历日
            lL = lDObj.isLeap;         //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最后一天

            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
        }

        //依节气调整二月分的年柱, 以立春为界
        if (m == 1 && (i + 1) == term2) cY = cyclical(y - 1900 + 36);
        //依节气月柱, 以「节」为界
        if ((i + 1) == firstNode) cM = cyclical((y - 1900) * 12 + m + 13);
        //日柱
        cD = cyclical(dayCyclical + i);

        //sYear,sMonth,sDay,week,
        //lYear,lMonth,lDay,isLeap,
        //cYear,cMonth,cDay
        this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7],
            lY, lM, lD++, lL,
            cY, cM, cD);
    }

    //节气
    tmp1 = sTerm(y, m * 2) - 1;
    tmp2 = sTerm(y, m * 2 + 1) - 1;
    this[tmp1].solarTerms = solarTerm[m * 2];
    this[tmp2].solarTerms = solarTerm[m * 2 + 1];
    if (m == 3) this[tmp1].color = '#F56C6C'; //清明颜色

    //公历节日
    for (i in sFtv)
        if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
            if (Number(RegExp.$1) == (m + 1)) {
                this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4 + ' ';
                if (RegExp.$3 == '*') this[Number(RegExp.$2) - 1].color = '#F56C6C';
            }

    //月周节日
    for (i in wFtv)
        if (wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
            if (Number(RegExp.$1) == (m + 1)) {
                tmp1 = Number(RegExp.$2);
                tmp2 = Number(RegExp.$3);
                if (tmp1 < 5)
                    this[((this.firstWeek > tmp2) ? 7 : 0) + 7 * (tmp1 - 1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
                else {
                    tmp1 -= 5;
                    tmp3 = (this.firstWeek + this.length - 1) % 7; //当月最后一天星期?
                    this[this.length - tmp3 - 7 * tmp1 + tmp2 - (tmp2 > tmp3 ? 7 : 0) - 1].solarFestival += RegExp.$5 + ' ';
                }
            }

    //农历节日
    for (i in lFtv)
        if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
            tmp1 = Number(RegExp.$1) - firstLM;
            if (tmp1 == -11) tmp1 = 1;
            if (tmp1 >= 0 && tmp1 < n) {
                tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1;
                if (tmp2 >= 0 && tmp2 < this.length && this[tmp2].isLeap != true) {
                    this[tmp2].lunarFestival += RegExp.$4 + ' ';
                    if (RegExp.$3 == '*') this[tmp2].color = '#F56C6C';
                }
            }
        }


    //复活节只出现在3或4月
    if (m == 2 || m == 3) {
        var estDay = new easter(y);
        if (m == estDay.m)
            this[estDay.d - 1].solarFestival = this[estDay.d - 1].solarFestival + ' 复活节 Easter Sunday';
    }


    if (m == 2) this[20].solarFestival = this[20].solarFestival + unescape('%20%u6D35%u8CE2%u751F%u65E5');

    //黑色星期五
    if ((this.firstWeek + 12) % 7 == 5)
        this[12].solarFestival += '黑色星期五';

    //今日
    if (y == tY && m == tM) this[tD - 1].isToday = true;
}


function calendarFull(y, m) {
    // 计算前后月份的日期，用来展示溢出部分
    let last_y = y, last_m = m, next_y = y, next_m = m;
    if (m == 0) {
        last_y = y - 1
        last_m = 11
    } else {
        last_m -= 1
    }
    if (m == 11) {
        next_y = y + 1
        next_m = 0
    } else {
        next_m += 1
    }
    
    var lastM = new calendar(last_y, last_m)
    var thisM = new calendar(y, m)
    var nextM = new calendar(next_y, next_m)

    let ret = [], index = 0;

    for (let i in lastM) {
        if (i >= lastM.length - thisM.firstWeek) {
            ret[index] = lastM[i]
            index += 1
        }
    }
    for (let i in thisM) {
        if (typeof thisM[i] !== 'number') {
            ret[index] = thisM[i]
            index += 1
        }
    }

    for (let i in nextM) {
        if (index <= 42) {
            ret[index] = nextM[i]
            index += 1
        }
    }

    ret['length'] = index - 1
    ret['firstWeek'] = thisM.firstWeek

    return ret
}
//======================================= 返回该年的复活节(春分后第一次满月周后的第一主日)
function easter(y) {

    var term2 = sTerm(y, 5); //取得春分日期
    var dayTerm2 = new Date(Date.UTC(y, 2, term2, 0, 0, 0, 0)); //取得春分的公历日期控件(春分一定出现在3月)
    var lDayTerm2 = new Lunar(dayTerm2); //取得取得春分农历

    if (lDayTerm2.day < 15) //取得下个月圆的相差天数
        var lMlen = 15 - lDayTerm2.day;
    else
        var lMlen = (lDayTerm2.isLeap ? leapDays(y) : monthDays(y, lDayTerm2.month)) - lDayTerm2.day + 15;

    //一天等于 1000*60*60*24 = 86400000 毫秒
    var l15 = new Date(dayTerm2.getTime() + 86400000 * lMlen); //求出第一次月圆为公历几日
    var dayEaster = new Date(l15.getTime() + 86400000 * (7 - l15.getUTCDay())); //求出下个周日

    this.m = dayEaster.getUTCMonth();
    this.d = dayEaster.getUTCDate();

}

//====================== 中文日期
function cDay(d) {
    var s;

    switch (d) {
        case 10:
            s = '初十'; break;
        case 20:
            s = '二十'; break;
            break;
        case 30:
            s = '三十'; break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}

var lDayToChinese = cDay

///////////////////////////////////////////////////////////////////////////////

var cld;

function drawCld(SY, SM) {
    var i, sD, s, size;
    cld = new calendar(SY, SM);

    if (SY > 1874 && SY < 1909) yDisplay = '光绪' + (((SY - 1874) == 1) ? '元' : SY - 1874);
    if (SY > 1908 && SY < 1912) yDisplay = '宣统' + (((SY - 1908) == 1) ? '元' : SY - 1908);

    if (SY > 1911) yDisplay = '建国' + (((SY - 1949) == 1) ? '元' : SY - 1949);

    GZ.innerHTML = yDisplay + '年 农历 ' + cyclical(SY - 1900 + 36) + '年 【' + Animals[(SY - 4) % 12] + '年】';

    YMBG.innerHTML = "&nbsp;" + SY + "<BR>&nbsp;" + monthName[SM];

    for (i = 0; i < 42; i++) {

        sObj = eval('SD' + i);
        lObj = eval('LD' + i);

        sObj.className = '';

        sD = i - cld.firstWeek;

        if (sD > -1 && sD < cld.length) { //日期内
            sObj.innerHTML = sD + 1;

            if (cld[sD].isToday) sObj.className = 'todyaColor'; //今日颜色

            sObj.style.color = cld[sD].color; //法定假日颜色

            if (cld[sD].lDay == 1) //显示农历月
                lObj.innerHTML = '<b>' + (cld[sD].isLeap ? '闰' : '') + cld[sD].lMonth + '月' + (monthDays(cld[sD].lYear, cld[sD].lMonth) == 29 ? '小' : '大') + '</b>';
            else //显示农历日
                lObj.innerHTML = cDay(cld[sD].lDay);

            s = cld[sD].lunarFestival;
            if (s.length > 0) { //农历节日
                if (s.length > 6) s = s.substr(0, 4) + '...';
                s = s.fontcolor('#F56C6C');
            }
            else { //公历节日
                s = cld[sD].solarFestival;
                if (s.length > 0) {
                    size = (s.charCodeAt(0) > 0 && s.charCodeAt(0) < 128) ? 8 : 4;
                    if (s.length > size + 2) s = s.substr(0, size) + '...';
                    s = (s == '黑色星期五') ? s.fontcolor('black') : s.fontcolor('blue');
                }
                else { //廿四节气
                    s = cld[sD].solarTerms;
                    if (s.length > 0) s = s.fontcolor('limegreen');
                }
            }

            if (cld[sD].solarTerms == '清明') s = '清明节'.fontcolor('#F56C6C');
            if (cld[sD].solarTerms == '芒种') s = '芒种节'.fontcolor('#F56C6C');
            if (cld[sD].solarTerms == '夏至') s = '夏至节'.fontcolor('#F56C6C');
            if (cld[sD].solarTerms == '冬至') s = '冬至节'.fontcolor('#F56C6C');



            if (s.length > 0) lObj.innerHTML = s;

        }
        else { //非日期
            sObj.innerHTML = '';
            lObj.innerHTML = '';
        }
    }
}


function changeCld() {
    var y, m;
    y = CLD.SY.selectedIndex + 1900;
    m = CLD.SM.selectedIndex;
    drawCld(y, m);
}

function pushBtm(K) {
    switch (K) {
        case 'YU':
            if (CLD.SY.selectedIndex > 0) CLD.SY.selectedIndex--;
            break;
        case 'YD':
            if (CLD.SY.selectedIndex < 150) CLD.SY.selectedIndex++;
            break;
        case 'MU':
            if (CLD.SM.selectedIndex > 0) {
                CLD.SM.selectedIndex--;
            }
            else {
                CLD.SM.selectedIndex = 11;
                if (CLD.SY.selectedIndex > 0) CLD.SY.selectedIndex--;
            }
            break;
        case 'MD':
            if (CLD.SM.selectedIndex < 11) {
                CLD.SM.selectedIndex++;
            }
            else {
                CLD.SM.selectedIndex = 0;
                if (CLD.SY.selectedIndex < 150) CLD.SY.selectedIndex++;
            }
            break;
        default:
            CLD.SY.selectedIndex = tY - 1900;
            CLD.SM.selectedIndex = tM;
    }
    changeCld();
}

var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();
//////////////////////////////////////////////////////////////////////////////

var width = "130";
var offsetx = 2;
var offsety = 8;

var x = 0;
var y = 0;
var snow = 0;
var sw = 0;
var cnt = 0;

var dStyle;
document.onmousemove = mEvn;

//显示详细日期资料
function mOvr(v) {
    var s, festival;
    var sObj = eval('SD' + v);
    var d = sObj.innerHTML - 1;

    //sYear,sMonth,sDay,week,
    //lYear,lMonth,lDay,isLeap,
    //cYear,cMonth,cDay

    if (sObj.innerHTML != '') {

        sObj.style.cursor = 's-resize';

        if (cld[d].solarTerms == '' && cld[d].solarFestival == '' && cld[d].lunarFestival == '')
            festival = '';
        else
            festival = '<TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR="#CCFFCC"><TR><TD>' +
                '<FONT COLOR="#000000" STYLE="font-size:9pt;">' + cld[d].solarTerms + ' ' + cld[d].solarFestival + ' ' + cld[d].lunarFestival + '</FONT></TD>' +
                '</TR></TABLE>';

        s = '<TABLE WIDTH="130" BORDER=0 CELLPADDING="2" CELLSPACING=0 BGCOLOR="#000066" style="filter:Alpha(opacity=80)"><TR><TD>' +
            '<TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD ALIGN="right"><FONT COLOR="#ffffff" STYLE="font-size:9pt;">' +
            cld[d].sYear + ' 年 ' + cld[d].sMonth + ' 月 ' + cld[d].sDay + ' 日<br>星期' + cld[d].week + '<br>' +
            '<font color="violet">农历' + (cld[d].isLeap ? '闰 ' : ' ') + cld[d].lMonth + ' 月 ' + cld[d].lDay + ' 日</font><br>' +
            '<font color="yellow">' + cld[d].cYear + '年 ' + cld[d].cMonth + '月 ' + cld[d].cDay + '日</font>' +
            '</FONT></TD></TR></TABLE>' + festival + '</TD></TR></TABLE>';

        document.all["detail"].innerHTML = s;

        if (snow == 0) {
            dStyle.left = x + offsetx - (width / 2);
            dStyle.top = y + offsety;
            dStyle.visibility = "visible";
            snow = 1;
        }
    }
}

//清除详细日期资料
function mOut() {
    if (cnt >= 1) { sw = 0; }
    if (sw == 0) { snow = 0; dStyle.visibility = "hidden"; }
    else cnt++;
}

//取得位置
function mEvn() {
    x = event.x;
    y = event.y;
    if (document.body.scrollLeft) { x = event.x + document.body.scrollLeft; y = event.y + document.body.scrollTop; }
    if (snow) {
        dStyle.left = x + offsetx - (width / 2);
        dStyle.top = y + offsety;
    }
}


///////////////////////////////////////////////////////////////////////////

function changeTZ() {
    CITY.innerHTML = CLD.TZ.value.substr(6)
    setCookie("TZ", CLD.TZ.selectedIndex)
}


function tick() {
    var today
    today = new Date()
    Clock.innerHTML = today.toLocaleString()
    Clock2.innerHTML = TimeAdd(today.toGMTString(), CLD.TZ.value)
    window.setTimeout("tick()", 1000);
}

function setCookie(name, value) {
    var today = new Date()
    var expires = new Date()
    expires.setTime(today.getTime() + 1000 * 60 * 60 * 24 * 365)
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString()
}

function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
        else return ""
    }
}

/////////////////////////////////////////////////////////

function initial() {

    dStyle = detail.style;
    CLD.SY.selectedIndex = tY - 1900;
    CLD.SM.selectedIndex = tM;
    drawCld(tY, tM);
    pushBtm('');
    CLD.TZ.selectedIndex = getCookie("TZ");
    changeTZ();
    tick();
}
//-->


export default calendarFull
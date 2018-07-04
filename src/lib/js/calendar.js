/**
 * @1900-2100区间内的公历、农历互转
 * @charset UTF-8
 * @Author  Jea杨(JJonline@JJonline.Cn) 
 * @Time    2014-7-21
 * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
 * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
 * @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
 * @Version 1.0.3
 * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
 * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
 */
var calendar = {

    /**
     * 农历1900-2100的润大小信息表
     * @Array Of Property
     * @return Hex 
     */
    lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
        0x0d520
    ], //2100

    /**
     * 公历每个月份的天数普通表
     * @Array Of Property
     * @return Number 
     */
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

    /**
     * 天干地支之天干速查表
     * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
     * @return Cn string 
     */
    Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

    /**
     * 天干地支之地支速查表
     * @Array Of Property 
     * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
     * @return Cn string 
     */
    Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],

    /**
     * 天干地支之地支速查表<=>生肖
     * @Array Of Property 
     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
     * @return Cn string 
     */
    Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"],

    /**
     * 24节气速查表
     * @Array Of Property 
     * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
     * @return Cn string 
     */
    solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"],

    /**
     * 1900-2100各年的24节气日期速查表
     * @Array Of Property 
     * @return 0x string For splice
     */
    sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
        '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
        'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
        '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
        '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
        '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
        '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
        '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
        '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
        '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'
    ],

    /**
     * 数字转中文速查表
     * @Array Of Property 
     * @trans ['日','一','二','三','四','五','六','七','八','九','十']
     * @return Cn string 
     */
    nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],

    /**
     * 日期转农历称呼速查表
     * @Array Of Property 
     * @trans ['初','十','廿','卅']
     * @return Cn string 
     */
    nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

    /**
     * 月份转农历称呼速查表
     * @Array Of Property 
     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
     * @return Cn string 
     */
    nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],



    //国历节日 *表示放假日
    sFtv: [
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
        "1226 毛泽东诞辰纪念"
    ],

    //农历节日 *表示放假日
    lFtv: [
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
        "0100 除夕"
    ],

    //某月的第几个星期几
    wFtv: [
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
        "1144 感恩节"
    ],


    /**
     * 返回农历y年一整年的总天数
     * @param lunar Year
     * @return Number
     * @eg:var count = calendar.lYearDays(1987) ;//count=387
     */
    lYearDays: function (y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) {
            sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0;
        }
        return (sum + calendar.leapDays(y));
    },

    /**
     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
     * @param lunar Year
     * @return Number (0-12)
     * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
     */
    leapMonth: function (y) { //闰字编码 \u95f0
        return (calendar.lunarInfo[y - 1900] & 0xf);
    },

    /**
     * 返回农历y年闰月的天数 若该年没有闰月则返回0
     * @param lunar Year
     * @return Number (0、29、30)
     * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
     */
    leapDays: function (y) {
        if (calendar.leapMonth(y)) {
            return ((calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        }
        return (0);
    },

    /**
     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
     * @param lunar Year
     * @return Number (-1、29、30)
     * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
     */
    monthDays: function (y, m) {
        if (m > 12 || m < 1) {
            return -1
        } //月份参数从1至12，参数错误返回-1
        return ((calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    },

    /**
     * 返回公历(!)y年m月的天数
     * @param solar Year
     * @return Number (-1、28、29、30、31)
     * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
     */
    solarDays: function (y, m) {
        if (m > 11 || m < 0) {
            return -1
        } //若参数错误 返回-1
        // var ms = m - 1;
        if (m == 1) { //2月份的闰平规律测算后确认返回28或29
            return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
        } else {
            return (calendar.solarMonth[m]);
        }
    },

    /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
    toGanZhiYear: function (lYear) {
        var ganKey = (lYear - 3) % 10;
        var zhiKey = (lYear - 3) % 12;
        if (ganKey == 0) ganKey = 10; //如果余数为0则为最后一个天干
        if (zhiKey == 0) zhiKey = 12; //如果余数为0则为最后一个地支
        return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];

    },

    /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
    toAstro: function (cMonth, cDay) {
        var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7"; //座
    },

    /**
     * 传入offset偏移量返回干支
     * @param offset 相对甲子的偏移量
     * @return Cn string
     */
    toGanZhi: function (offset) {
        return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
    },

    /**
     * 传入公历(!)y年获得该年第n个节气的公历日期
     * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
     * @return day Number
     * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
     */
    getTerm: function (y, n) {
        if (y < 1900 || y > 2100) {
            return -1;
        }
        if (n < 1 || n > 24) {
            return -1;
        }
        var _table = calendar.sTermInfo[y - 1900];
        var _info = [
            parseInt('0x' + _table.substr(0, 5)).toString(),
            parseInt('0x' + _table.substr(5, 5)).toString(),
            parseInt('0x' + _table.substr(10, 5)).toString(),
            parseInt('0x' + _table.substr(15, 5)).toString(),
            parseInt('0x' + _table.substr(20, 5)).toString(),
            parseInt('0x' + _table.substr(25, 5)).toString()
        ];
        var _calday = [
            _info[0].substr(0, 1),
            _info[0].substr(1, 2),
            _info[0].substr(3, 1),
            _info[0].substr(4, 2),

            _info[1].substr(0, 1),
            _info[1].substr(1, 2),
            _info[1].substr(3, 1),
            _info[1].substr(4, 2),

            _info[2].substr(0, 1),
            _info[2].substr(1, 2),
            _info[2].substr(3, 1),
            _info[2].substr(4, 2),

            _info[3].substr(0, 1),
            _info[3].substr(1, 2),
            _info[3].substr(3, 1),
            _info[3].substr(4, 2),

            _info[4].substr(0, 1),
            _info[4].substr(1, 2),
            _info[4].substr(3, 1),
            _info[4].substr(4, 2),

            _info[5].substr(0, 1),
            _info[5].substr(1, 2),
            _info[5].substr(3, 1),
            _info[5].substr(4, 2),
        ];
        return parseInt(_calday[n - 1]);
    },

    /**
     * 传入农历数字月份返回汉语通俗表示法
     * @param lunar month
     * @return Cn string
     * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
     */
    toChinaMonth: function (m) { // 月 => \u6708
        if (m > 12 || m < 1) {
            return -1
        } //若参数错误 返回-1
        var s = calendar.nStr3[m - 1];
        s += "\u6708"; //加上月字
        return s;
    },

    /**
     * 传入农历日期数字返回汉字表示法
     * @param lunar day
     * @return Cn string
     * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
     */
    toChinaDay: function (d) { //日 => \u65e5
        var s;
        switch (d) {
            case 10:
                s = '\u521d\u5341';
                break;
            case 20:
                s = '\u4e8c\u5341';
                break;
                break;
            case 30:
                s = '\u4e09\u5341';
                break;
                break;
            default:
                s = calendar.nStr2[Math.floor(d / 10)];
                s += calendar.nStr1[d % 10];
        }
        return (s);
    },

    /**
     * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
     * @param y year
     * @return Cn string
     * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
     */
    getAnimal: function (y) {
        return calendar.Animals[(y - 4) % 12]
    },


    /**
     * 计算节日
     * 
     */
    getFestival: function (theDay) {
        //公历节日
        for (let i in this.sFtv) {
            if (this.sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
                if (
                    Number(RegExp.$1) == theDay.sMonth &&
                    Number(RegExp.$2) == theDay.sDay
                ) {
                    theDay.solarFestival += RegExp.$4 + ' ';
                    if (RegExp.$3 == '*') theDay.color = '#F56C6C';
                }
        }

        // //农历节日
        for (let i in this.lFtv) {
            if (this.lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
                if (
                    Number(RegExp.$1) == theDay.lMonth &&
                    Number(RegExp.$2) == theDay.lDay
                ) {
                    theDay.lunarFestival += RegExp.$4 + ' ';
                    if (RegExp.$3 == '*') theDay.color = '#F56C6C';
                }
            }
        }
    },

    /**
     * 东正教复活节
     */
    getEasterDay: function (year) {
        let N = year - 1900;
        let A = N % 19;
        let Q = N / 4;
        let B = (7 * A + 1) / 19;
        let M = (11 * A + 4 - B) % 29;
        let W = (N + Q + 31 - M) % 7;
        let result = 25 - M - W;

        let r = {year:year}

        if (result == 0) {
            r.month = 3;
            r.day = 31;
        } else if (result > 0) {
            r.month = 4;
            r.day = result;
        } else {
            r.month = 3;
            r.day = (31 + result);
        }
        return r;
    },

    /**
     * 复活节高斯算法
     */
    easter: function (x) {
        function preyear(x) {
            var theDate = new Date();
            if (x == 'xxx') {
                x = theDate.getYear();
                if (navigator.appName == 'Netscape') {
                    x += 1900;
                }
            } else {
                x = parseInt(x, 10)
            };
            if (x < 1583) {
                x = 1583
            };
            return x;
        }
        function century(x) {
            var tmp = Math.floor(preyear(x) / 100) + 1;
            return tmp;
        }
        function syn(x) {
            var tmp = Math.floor((8 * century(x) + 5) / 25) - 5;
            return tmp;
        }
        function drop(x) {
            var tmp = Math.floor(3 * century(x) / 4) - 12;
            return tmp;
        }
        function golden(x) {
            var tmp = (preyear(x) % 19) + 1;
            return tmp;
        }
        function ep(x) {
            var gd = golden(x);
            var epact = (11 * gd + 20 + syn(x) - drop(x)) % 30;
            if (epact < 0) {
                epact += 30
            };
            if ((epact == 25) && (golden > 11)) {
                epact++
            };
            if (epact == 24) {
                epact++
            };
            return epact;
        }
        function fs(x) {
            var year = preyear(x);
            var tmp = Math.floor(5 * year / 4) - drop(year) - 10;
            return tmp;
        }
        function sun_march(x) {
            return ((-fs(x)) % 7) + 7;
        }
        function fm(x) {
            var year = preyear(x);
            var f = 44 - ep(year);
            if (f > 30) {
                f -= 30
            };
            return f;
        }
        function mpost(x) {
            var tmp = fm(x);
            if (tmp < 21) {
                tmp += 30
            };
            return tmp;
        }
        function fmoon(x) {
            var tmp = mpost(x);
            var fsun = fs(x);
            return (tmp + 7) - ((fsun + tmp) % 7);
        }
        var year = preyear(x);
        var fullmoon = fmoon(x);
        var msg
        if (fullmoon > 31) {
            msg = { year:year,month:4,day:(fullmoon - 31)}
        } else {
            msg = { year:year,month:3,day:fullmoon }
        };
        return msg;
    },

    /**
     * 周节日、黑色星期五、复活节等需要一个月计算一次的特殊节日
     * @param obj 传入的当月日期列表数据
     */
    getFestivalMonthObject: function (obj) {

        // 复活节只出现在3或4月
        if (obj[0].sMonth == 3 || obj[0].sMonth == 4) {
            let easter = this.easter(obj[0].sYear)
            // let easter = this.getEasterDay(obj[0].sYear) // 东正教
            if (easter.month === obj[0].sMonth && obj[easter.day - 1].sDay === easter.day) {
                obj[easter.day - 1].solarFestival += '复活节'
            }
        }

        //月周节日
        for (let i in this.wFtv) {
            if (this.wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
                if (Number(RegExp.$1) == obj[0].sMonth) {
                    let tmp1 = Number(RegExp.$2);
                    let tmp2 = Number(RegExp.$3);

                    if (tmp1 < 5)
                        // for (let i in obj) {
                        //     obj[i].weekCount
                        // }
                        obj[((obj.firstWeek > tmp2) ? 7 : 0) + 7 * (tmp1 - 1) + tmp2 - obj.firstWeek].solarFestival += RegExp.$5 + ' ';
                    else {
                        tmp1 -= 5;
                        let tmp3 = (obj.firstWeek + obj.length - 1) % 7; //当月最后一天星期?
                        obj[obj.length - tmp3 - 7 * tmp1 + tmp2 - (tmp2 > tmp3 ? 7 : 0) - 1].solarFestival += RegExp.$5 + ' ';
                    }
                }
        }

        //黑色星期五
        if ((obj.firstWeek + 12) % 7 == 5)
            obj[12].solarFestival += '黑色星期五';
    },


    /**
     * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
     * @param y  solar year
     * @param m  solar month
     * @param d  solar day
     * @return JSON object
     * @eg:console.log(calendar.solar2lunar(1987,11,01));
     */
    solar2lunar: function (y, m, d) { //参数区间1900.1.31~2100.12.31
        //年份限定、上限
        if (y < 1900 || y > 2100) {
            return -1; // undefined转换为数字变为NaN
        }
        //公历传参最下限
        if (y == 1900 && m == 1 && d < 31) {
            return -1;
        }
        //未传参  获得当天
        if (!y) {
            var objDate = new Date();
        } else {
            var objDate = new Date(y, parseInt(m) - 1, d)
        }
        var i, leap = 0,
            temp = 0;
        //修正ymd参数
        var y = objDate.getFullYear(),
            m = objDate.getMonth() + 1,
            d = objDate.getDate();
        var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
        for (i = 1900; i < 2101 && offset > 0; i++) {
            temp = calendar.lYearDays(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }

        //是否今天
        var isTodayObj = new Date(),
            isToday = false;
        if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
            isToday = true;
        }
        //星期几
        var nWeek = objDate.getDay(),
            cWeek = calendar.nStr1[nWeek];
        //数字表示周几顺应天朝周一开始的惯例
        if (nWeek == 0) {
            nWeek = 7;
        }
        //农历年
        var year = i;
        var leap = calendar.leapMonth(i); //闰哪个月
        var isLeap = false;

        //效验闰月
        for (i = 1; i < 13 && offset > 0; i++) {
            //闰月
            if (leap > 0 && i == (leap + 1) && isLeap == false) {
                --i;
                isLeap = true;
                temp = calendar.leapDays(year); //计算农历闰月天数
            } else {
                temp = calendar.monthDays(year, i); //计算农历普通月天数
            }
            //解除闰月
            if (isLeap == true && i == (leap + 1)) {
                isLeap = false;
            }
            offset -= temp;
        }
        // 闰月导致数组下标重叠取反
        if (offset == 0 && leap > 0 && i == leap + 1) {
            if (isLeap) {
                isLeap = false;
            } else {
                isLeap = true;
                --i;
            }
        }
        if (offset < 0) {
            offset += temp;
            --i;
        }
        //农历月
        var month = i;
        //农历日
        var day = offset + 1;
        //天干地支处理
        var sm = m - 1;
        var gzY = calendar.toGanZhiYear(year);

        // 当月的两个节气
        // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
        var firstNode = calendar.getTerm(y, (m * 2 - 1)); //返回当月「节」为几日开始
        var secondNode = calendar.getTerm(y, (m * 2)); //返回当月「节」为几日开始

        // 依据12节气修正干支月
        var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
        if (d >= firstNode) {
            gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
        }

        //传入的日期的节气与否
        var isTerm = false;
        var Term = null;
        if (firstNode == d) {
            isTerm = true;
            Term = calendar.solarTerm[m * 2 - 2];
        }
        if (secondNode == d) {
            isTerm = true;
            Term = calendar.solarTerm[m * 2 - 1];
        }
        //日柱 当月一日与 1900/1/1 相差天数
        var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
        var gzD = calendar.toGanZhi(dayCyclical + d - 1);
        //该日期所属的星座
        var astro = calendar.toAstro(m, d);
        let m2 = `${m}`,
            d2 = `${d}`;
        if (m < 10) m2 = `0${m}`;
        if (d < 10) d2 = `0${d}`;
        let sDate = `${y}-${m2}-${d2}`




        let theDay = {
            'cYear': gzY, // 天干地支
            'cMonth': gzM,
            'cDay': gzD,
            'lunarFestival': '', // 农历节日
            'lYear': year, // 农历年
            'lMonth': month,
            'lDay': day,
            'Animal': calendar.getAnimal(year), // 生肖
            'lMonthChinese': (isLeap ? "\u95f0" : '') + calendar.toChinaMonth(month),
            'lDayChinese': calendar.toChinaDay(day),
            'sYear': y, // 阳历年
            'sMonth': m,
            'sDay': d,
            'sDate': sDate,
            'isToday': isToday,
            'isLeap': isLeap,
            'nWeek': nWeek,
            'week': cWeek, // 中文周
            'weekCount': 0,
            'isTerm': isTerm, // 是否节气
            'solarTerms': Term, // 节气
            'solarFestival': '',
            'color': '',
            'astro': astro
        };

        // 计算节日
        let solarFestival = this.getFestival(theDay)

        return theDay
    },

    /**
     * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
     * @param y  lunar year
     * @param m  lunar month
     * @param d  lunar day
     * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
     * @return JSON object
     * @eg:console.log(calendar.lunar2solar(1987,9,10));
     */
    lunar2solar: function (y, m, d, isLeapMonth) { //参数区间1900.1.31~2100.12.1
        var isLeapMonth = !!isLeapMonth;
        var leapOffset = 0;
        var leapMonth = calendar.leapMonth(y);
        var leapDay = calendar.leapDays(y);
        if (isLeapMonth && (leapMonth != m)) {
            return -1;
        } //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
        if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
            return -1;
        } //超出了最大极限值 
        var day = calendar.monthDays(y, m);
        var _day = day;
        //bugFix 2016-9-25 
        //if month is leap, _day use leapDays method 
        if (isLeapMonth) {
            _day = calendar.leapDays(y, m);
        }
        if (y < 1900 || y > 2100 || d > _day) {
            return -1;
        } //参数合法性效验

        //计算农历的时间差
        var offset = 0;
        for (var i = 1900; i < y; i++) {
            offset += calendar.lYearDays(i);
        }
        var leap = 0,
            isAdd = false;
        for (var i = 1; i < m; i++) {
            leap = calendar.leapMonth(y);
            if (!isAdd) { //处理闰月
                if (leap <= i && leap > 0) {
                    offset += calendar.leapDays(y);
                    isAdd = true;
                }
            }
            offset += calendar.monthDays(y, i);
        }
        //转换闰月农历 需补充该年闰月的前一个月的时差
        if (isLeapMonth) {
            offset += day;
        }
        //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
        var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
        var calObj = new Date((offset + d - 31) * 86400000 + stmap);
        var cY = calObj.getUTCFullYear();
        var cM = calObj.getUTCMonth() + 1;
        var cD = calObj.getUTCDate();

        return calendar.solar2lunar(cY, cM, cD);
    },
    /**
     * 制造某个月的日历对象
     * @param y year 四位数的年份
     * @param m month 真实月份
     */
    monthCalendar: function (y, m) {
        // console.log('monthCalendar', y, m);
        // m=m-1
        let arr = []
        let sDObj = new Date(y, m, 1, 0, 0, 0, 0); //当月一日日期

        let length = this.solarDays(y, m); //公历当月天数

        // console.log('sDObj',sDObj.toLocaleDateString(),length);
        arr.firstWeek = sDObj.getDay(); //公历当月1日星期几
        let thisDay, weekcount = {}
        for (let i = 1; i < length + 1; i++) {
            //solar2lunar接收的月份是真实月份，这里的m传入时-1了，所以要加回来

            thisDay = calendar.solar2lunar(y, m + 1, i)
            // console.log(y,m,i,thisDay);
            // 统计星期几出现的次数
            if (weekcount[thisDay.week]) {
                weekcount[thisDay.week]++
            } else {
                weekcount[thisDay.week] = 1
            }
            thisDay.weekCount = weekcount[thisDay.week]
            arr.push(thisDay)
        }

        this.getFestivalMonthObject(arr)


        return arr
    },
    /**
     * 制作42天的日期对象，包含第一天的那一周和最后一天的那一周，避免缺角，添加到42天
     */
    fullMonthCalendar: function (y, m) {
        // m=m-1
        let last_y = y,
            last_m = m,
            next_y = y,
            next_m = m;
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
        var lastM = this.monthCalendar(last_y, last_m)
        var thisM = this.monthCalendar(y, m)
        var nextM = this.monthCalendar(next_y, next_m)

        let ret = [],
            index = 0;
        for (let i in lastM) {
            if (i >= lastM.length - thisM.firstWeek) {
                ret.push(lastM[i])
                index += 1
            }
        }
        for (let i in thisM) {
            if (typeof thisM[i] !== 'number') {
                // ret[index] = thisM[i]
                ret.push(thisM[i])
                index += 1
            }
        }

        for (let i in nextM) {
            if (index < 42) {
                ret.push(nextM[i])
                // ret[index] = nextM[i]
                index += 1
            }
        }
        return ret
    },
};




export default calendar
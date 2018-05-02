# InfoHub Javascript 新聞 API 說明文件

InfoHub Javascript API 提供開發者輕鬆存取各國各類型的目標新聞訊息，並且將目標新聞放置在開發者所指定的網頁空間內，在本說明文件內，將會提供 **API 使用範例**與**基本介面介紹**。

若有任何問題，歡迎來信 daniel.hsieh@droi.com 詢問，謝謝。

## API 使用範例

```javascript
<!doctype html>
<html>

<head>
    <title>InfoHub News Query API Demo</title>
    <meta charset="utf-8">
    <meta name="author" content="Daniel Hsieh">
    <meta name="google-play-app" content="app-id=com.idroi.infohub">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="infohub-news-query.css" type="text/css" media="screen">
</head>

<body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
    <script src="infohub-news-query.js"></script>
    <script>
        $(function () {
            // case 1: default news query
            var query = $.newsquery();
            query.show();

            // case 2: query en-US beauty news and place image in left position
            // then, we put all news in #hot-girl-en-us-news-container block
            var query2 = $.newsquery({
                'language':'zh',            // news language
                'country':'TW',             // news country
                'category':'beauty',        // news category
                'image_position':'left',    // news main image position

                // the element to host news block
                'appendToSelector':'#hot-girl-zh-tw-news-container'
            });
            query2.show();
        });
    </script>

    <p>InfoHub News (default):</p>
    <div id='news-container'>
    </div>

    <p>InfoHub News (en-US-beauty):</p>
    <div id='hot-girl-zh-tw-news-container'>
    </div>

</body>

</html>
```

## API 基本介面介紹

### 建構子方法選填選項 (與客戶分析有關)

* utm_source (String): InfoHub API 用戶名稱。
  * 隱含值： `infohub`。
* utm_medium (String): InfoHub API 用戶導流 Agent 名稱。
  * 隱含值： `javascript_api`。
* utm_campaign (String): InfoHub API 用戶導流方式。
  * 隱含值： `news_click`。

### 建構子方法選填選項 (與目標新聞提取有關)

* language (String): 目標新聞語言。
  * 隱含值：`en`。
  * 候選值：ISO 639-1 語言碼。
* country (String): 目標新聞國家。
  * 隱含值：`US`。
  * 候選值：ISO 3166-1 alpha-2 國碼。
* category (String): 目標新聞分類。
  * 隱含值：`for you`
  * 候選值：

    | 分類     | 代碼          |
    |--------:|:--------------|
    | 為你     | for you       |
    | 商務     | business      |
    | 娛樂     | entertainment |
    | 運動     | sports        |
    | 科技     | technology    |
    | 趣味     | funny         |
    | 本地     | local         |
    | 國際     | world         |
    | 汽車     | cars          |
    | 美食     | food          |
    | 藝術     | art           |
    | 電影     | movies        |
    | 流行     | fashion       |
    | 音樂     | music         |
    | 政治     | politics      |
    | 健康     | health        |
    | 時尚生活 | lifestyle     |
    | 寵物     | pets          |
    | 科學     | science       |
    | 旅遊     | travel        |
    | 美女     | beauty        |
    | 遊戲     | gaming        |

* query_size (Number): 目標新聞數量。
  * 隱含值：`10`
  * 候選值：`1 ~ 10`

### 建構子方法選填選項 (與目標新聞呈現有關)

* appendToSelector (string): 將目標新聞放置特定的區塊
  * 隱含值：`#news-container`
  * 候選值：jquery selector
* image_position (string): 新聞圖片位置
  * 隱含值：`right`
  * 候選職：`left` 或者 `right`
* open_new_window (boolean): 在新視窗開啟新聞
  * 隱含值：`true`
  * 候選值：`true` 或者 `false`

### 方法說明

方法                | 描述
-------------------|----
show()             | 將目標新聞展現在特定的區塊
refresh()          | 重新更新該區塊的新聞
more()             | 要求更多目標新聞
prerender()        | 預載模糊占位圖
fetchNewsRawData() | 提取新聞的原始資料

* show(): 將目標新聞展現在特定的區塊
  * 代碼

    ```javascript
    var query = $.newsquery();
    query.show();
    ```

* refresh(): 重新更新該區塊的新聞
  * 代碼

    ```javascript
    var query = $.newsquery();
    query.refresh();
    ```

* more(): 要求更多目標新聞
  * 代碼

    ```javascript
    var query = $.newsquery();
    query.more();
    ```

* prerender(): 預載模糊占位圖
  * 代碼

    ```javascript
    var query = $.newsquery();
    query.prerender();
    ```

* fetchNewsRawData(): 提取新聞的原始資料
  * 代碼

    ```javascript
    var query = $.newsquery();
    query.fetchNewsRawData(function(data){
        // 輸出 data: JSON格式的新聞原始資料
        console.log(JSON.stringify(data));
    });
    ```

  * 輸出 data JSON 格式介紹:

    鍵 | 型別 | 描述 | 備註
    ---------|----------|----------|---------
    `like_numbers`      | Number | 按讚數量 | 無
    `unlike_numbers`    | Number | 按爛數量 | 無
    `source_name`       | String | 來源名稱 | 無
    `image_url_array`   | Array | 圖檔連結 | 隱含則不顯示
    `category`          | Array | 新聞分類 | 無
    `page_link`         | String | 新聞連結 | 無
    `title`             | String | 新聞標題 | 無
    `source_date_int`   | Number | 新聞時戳 | 無

  * 輸出 data JSON 格式範例:

    ```json
    [
        {
            "unlike_numbers": 3,
            "category": [
                "beauty"
            ],
            "source_name": "POPBEE",
            "image_url_array": [
                "http://media.infohubapp.com/wlbe-pjXHgZ7bwZ__dMfZuBXDpyDZSEBz9pgchqYOiXlHnsXULWNOjVqktz9JeDh4UsT2k5fP-2epVb9lvvS2xbg2mM=s450-c"
            ],
            "like_numbers": 2,
            "page_link": "https://www.infohubapp.com/news-20180311/b2e63aeb4f4316c6f0498d81210c56a0.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "title": "大量美甲靈感放送：熱愛美甲請 Follow 這個日本 IG 帳戶，因為每一款都太獨特、太精緻！",
            "source_date_int": 1520757248
        },
        {
            "unlike_numbers": 3,
            "category": [
                "beauty"
            ],
            "source_name": "POPBEE",
            "image_url_array": [
                "http://media.infohubapp.com/Kpp1ayTDEmfbH9giFg4qC5jSEzrrh9yCmU2mXbUivz4j5FKCkNg3FaI-orrsQY2yX1b1q8L9n3iRRGu5IEKl2Mp8Ww=s450-c"
            ],
            "like_numbers": 5,
            "page_link": "https://www.infohubapp.com/news-20180313/0d5128129e572cbfd89654d66d4477d3.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "title": "因為 Margot Robbie 和 Emma Stone 的演繹，這個簡單至極的髮型即將成為潮流了！",
            "source_date_int": 1520914198
        },
        {
            "unlike_numbers": 10,
            "category": [
                "beauty"
            ],
            "source_name": "POPBEE",
            "image_url_array": [
                "http://media.infohubapp.com/Tf8GvuarLu1_nLVvBLeFGs8ZACV3kZsTkQvNRSOj2SkX1pFbmUslVn1P1-MkjJ8PzJh87PHHbif4OsCtrEq0lIkrVA=s450-c"
            ],
            "like_numbers": 6,
            "page_link": "https://www.infohubapp.com/news-20180312/979e775774efd87f628c07c1a2d4e033.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "title": "暗瘡肌、眉上瀏海、助曬油：Emma Watson 大談她的所有美容關鍵字！",
            "source_date_int": 1520844089
        },
        {
            "unlike_numbers": 5,
            "category": [
                "beauty"
            ],
            "source_name": "POPBEE",
            "image_url_array": [
                "http://media.infohubapp.com/u9ZZxXtTQaEgfqbPlLpi7dPB-aZxZoTGEQmLxyo3pS1Z179FnbL2uZPVEzphgWrr98yNTifbri_e5GTYGfCGSegI=s450-c"
            ],
            "like_numbers": 1,
            "page_link": "https://www.infohubapp.com/news-20180310/71e5abe1b736fc649ab4e7d3671a0a40.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "title": "對抗乾燥冬天的妙招，韓國女星 IU 分享妝前保養「升級版濕敷」是關鍵！",
            "source_date_int": 1520671470
        },
        {
            "unlike_numbers": 6,
            "category": [
                "beauty"
            ],
            "source_name": "POPBEE",
            "image_url_array": [
                "http://media.infohubapp.com/uM_a60vpa2EHPTzwkdNTcoFpNWxIzJBvt3TwaeoLNVfdvgUnvOIbx7buXghh1H1sdppjh7L83WwtiumH3glftK_-=s450-c"
            ],
            "like_numbers": 10,
            "page_link": "https://www.infohubapp.com/news-20180313/d40657e44e2d0e90c802af5ea30ca47c.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "title": "美肌也要有機：為你推薦 4 款天然無害又質量超好的有機護膚品！",
            "source_date_int": 1520912733
        },
        {
            "unlike_numbers": 5,
            "category": [
                "beauty"
            ],
            "source_name": "POPBEE",
            "image_url_array": [
                "http://media.infohubapp.com/BOx0k3BaAzlIvVMul9P8lXuTF7fC2Lsf3YowzUHRz54vZESZhC6Ob2l8st6t1PJ1Nifznn6pyMnbwPwXnAkAUpVs=s450-c"
            ],
            "like_numbers": 4,
            "page_link": "https://www.infohubapp.com/news-20180311/0dbc8624d712907666008826d61c9714.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "title": "一眾荷里活女星已率先示範 2018 春季流行眼妝色系",
            "source_date_int": 1520750865
        },
        {
            "like_numbers": 4,
            "source_name": "聯合新聞",
            "unlike_numbers": 3,
            "page_link": "https://www.infohubapp.com/news-20180311/2673d07748b4b2a9b357172f09765d6d.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "image_url_array": [
                "http://media.infohubapp.com/xefM4WEXjHK6GzXh69cGeNG-bzxbAmxpJuNF3jCKtYMs4dAoNkAu6afFJ_C8rUGpSQEH3hyva0btX6Mh0yRj0_3hado=s450-c",
                "http://media.infohubapp.com/zmG3xyQ4fH4ATaL_TG9OlIxZF6NdAj4Obq7iUg4FbNiYALS9nHxckNc8HXnD5pLrwGQFD8JLBpzcERyk2jkIOqgXZg=s450-c"
            ],
            "category": [
                "beauty"
            ],
            "title": "女生都該學會的經期保養法 讓你那個來不再心情差皮膚爛",
            "source_date_int": 1520731800
        },
        {
            "like_numbers": 8,
            "source_name": "聯合新聞",
            "unlike_numbers": 9,
            "page_link": "https://www.infohubapp.com/news-20180310/33a97afdfdc340e9fb339e9943fb10df.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "image_url_array": [
                "http://media.infohubapp.com/UME5n4gQXNQgtuzYZ54RSN74s-TV6HMPcIn9f4XP9F8XrspU_SgPD2jFcPr8AhDb0LUJW4tAF92AYW0OB3BgOC5a=s450-c",
                "http://media.infohubapp.com/aB8rBgXe89apsX3CZNnd1aF3R5rUHN83waQ-D-FeWj9azFNupbuNUVpVpXcvIjJVVv_qkEZihpCmJLNRJHVAaG_Pyg=s450-c"
            ],
            "category": [
                "beauty"
            ],
            "title": "短髮好看還能開運 新垣結衣、徐璐事業運都飆升",
            "source_date_int": 1520645400
        },
        {
            "unlike_numbers": 4,
            "category": [
                "beauty"
            ],
            "source_name": "POPBEE",
            "image_url_array": [
                "http://media.infohubapp.com/4Dtt0G1LIdbIhT_W5BwsbGyMGahdYZv2ZmIibs31wSX1qhCzDDzF4SGUG2iXAramjhqwWY9UjmJ4f2QY_Ajq39Cn=s450-c"
            ],
            "like_numbers": 1,
            "page_link": "https://www.infohubapp.com/news-20180312/4d02e99e79a633c50b1c06ad92c24ff3.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "title": "不要再傻傻分不清：Toner 和 Essence 其實該這樣用！",
            "source_date_int": 1520839877
        },
        {
            "unlike_numbers": 5,
            "category": [
                "beauty"
            ],
            "source_name": "POPBEE",
            "image_url_array": [
                "http://media.infohubapp.com/BOx0k3BaAzlIvVMul9P8lXuTF7fC2Lsf3YowzUHRz54vZESZhC6Ob2l8st6t1PJ1Nifznn6pyMnbwPwXnAkAUpVs=s450-c"
            ],
            "like_numbers": 4,
            "page_link": "https://www.infohubapp.com/news-20180311/0dbc8624d712907666008826d61c9714.html?utm_source=InfoHub&utm_medium=javascript_api&utm_campaign=news_click&config=dXNlcl9uYW1lPUluZm9IdWI=",
            "title": "一眾荷里活女星已率先示範 2018 春季流行眼妝色系",
            "source_date_int": 1520750865
        }
    ]
    ```
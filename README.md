# (Group 22) Our_Calendar

## 一句話描述這個服務在做什麼

- 一個可以跟他人共同編輯的行事曆。

## 安裝/使用/操作方式

- clone this repo
- 進入backend & frontend
- npm install ( both backend and frontend )
- npm start ( both backend and frontend )

p.s. <br/>
frontend 使用 port:3000 <br/>
backend 使用port:4000
install中有機會會有warning，可以先忽略他...

## 其他說明

使用方法：
- First, sign up an account with email, name, and password.
- Second, sign in.
- In the calendar, we can create events, create new group......

1. groups:
> 在右方的中間區域，是所有你已加入的groups。每個user都有自己的default group，也就是每次登入首先render出來的calendar所屬的group，顯示在calendar右上角，如有紅色的圓圈，便表示當前是default group。每個 Groups 都有一個manager，負責groups中的users 管理。<br/>
> 目前已有的manager權限：
> - add users
> - change manager
> - delete group
> - change group name<br/>

2. events:
> 每個group中都有events。Events由group users共同編輯，每個user都可以新增events在group中。<br/>
> Ｇroup 中的events雖然是共同編輯，但group users的權限僅止於查看events，以下是只有event的持有者才有權限做的事（位於右下角區域）：
> - change event name, times, body
> - delete event

3. users:
> 右上角區域是user profile。若要編輯，請按右上角的edit icon (pen)。<br/>
> p.s.請滑至最下方，有個save icon ，按下去才有save喲～～(password更改也在這裡)

## 使用與參考之框架/模組/原始碼

1. React : frontend
2. Apollo Client: 處理 client 端和 GraphQL schema的連接
3. GrphQL 定義資料查詢
4. Node.js ：backend
5. MongoDB : database

## 專題製作心得

> 黃彥翔<br>
> 因為大二下的作業繁重，期末已經應付不來，Web Final想當然是拖到放暑假才開始弄＠＠，因此時間不充裕，只好犧牲睡眠爆肝來製作這一份project，可以說是完美的銜接上我早上睡早上起的期末生活作息...
>
>從一開始完全不知道從何開始做起，到後來做出一個成果，可以說這一次的project是web proqramming中我收穫最大的一課。未來希望可以將這一次的作業再次upgrade，也希望可以把他真的deploy，或是製作成更實用的app。

> 陳彥霖<br>
> 規劃完善、健康有效率的完成一個project(X)<br>
> 打扣時間指數成長、一個禮拜不眠不休爆肝弄懂GraphQL(O)<br>
> 
> 期中以後Web進到後端以後真的像是進新宇宙一樣，總是有百百種套件需要去研究、整合，這次主要負責GraphQL的部分，常常有bugㄧ底就是要數個小時甚至快一天，真是快累掛了。然而不得不說GraphQL真的是一個很強大的資料整合套件，雖然不好上手但卻是真的強大。
> 
> 這次做project也算是讓我發現自己的打扣的思考方式還有蠻大的進步空間，缺乏top to bottom的思考模式讓這次做project時很多時候就只能走一步算一步，所以最後整合起來並不如原本所想的那麼好，希望未來能夠持續進步。


## 使用之第三方套件、框架、程式碼

1. material ui : table, picker, textarea, button
2. jwt : 登入系統


## Demo 影片連結

## 每位組員之貢獻

> 黃彥翔 : <br>
> 前端React製作（calendar部分全部手刻......),<br/>
> MongoDB schema設計<br>
> GraphQL 和 db 連接

> 陳彥霖 : <br>
> GraphQL schema和resolver設計<br>
> Apollo Client、graphql Server架設<br>
> 登入系統設計

## 對於此課程的建議

因為這們課每次作業量都不少，因此希望可以在一開始有更詳細的課程時程表，以提早更多時間知道作業內容，讓我們可以更好的規劃時間。



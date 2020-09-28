'use strict'

{
  class Panel {  //パネルを表しており、パネルの内容に責任を持っている
    constructor() {
      //li要素作成
      this.el = document.createElement('li')
      this.el.classList.add('pressed')//パネルを灰色にする
      this.el.addEventListener('click', () => {
        this.check()
      })
    }
    getEl() {
      return this.el //elプロパティを呼び出し元に返すだけ
    }
    activate(num) {
      this.el.classList.remove('pressed')
      this.el.textContent = num
    }
    check() {
      if (currentNum === parseInt(this.el.textContent, 10)) {
        this.el.classList.add('pressed')
        currentNum++

        if (currentNum === 4) {
          clearTimeout(timeoutId)
        }
      }
    }
  }

  class Board {　//パネルを4つ持ったボードを表している
    //クラスのconstructor()はクラス作成時に実行される
    constructor() {
      this.panels = []
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel())　//パネルインスタンス作成
      }
      //this.panelsに要素が追加された
      this.setup()
    }

    //読み込み時の画面セットアップ処理
    setup() {
      const board = document.getElementById('board')
      this.panels.forEach((panel) => {
        //panelにはPanelインスタンスが渡っている
        //Panelインスタンスのelプロパティがli要素となる
        //board.appendChild(panel.el)
        //クラスのプロパティに外部から直接アクセスしないほうがよいので、メソッド経由で取得する
        board.appendChild(panel.getEl())
      })
    }

    //Start時の処理
    activate() {
      const nums = [0, 1, 2, 3]

      this.panels.forEach((panel) => {

        //splice関数は削除された要素の配列を返します
        //Panelクラスのactiveメソッドに0~3のランダムな値を渡したい
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0]

        //panelはPanelインスタンス
        //それぞれのPanelインスタンスののelプロパティに処理を実行したいので、forEachでループしてあげる
        panel.activate(num)
        //パネルに関する処理はPanelクラスが担当するので、メソッドを呼び出すだけにしておく
      })
    }
  }

  const board = new Board()//li要素を４つ作れた
  //押し込むべき数値を宣言、最初は０ (再代入するのでletを使う)
  let currentNum

  //タイマー開始した時間
  let startTime

  //タイマー停止用
  let timeoutId
  //constにすると再代入が何度も行われるので駄目

  //ボタン要素取得
  const btn = document.getElementById('btn')

  //startボタンクリック時
  btn.addEventListener('click', () => {
    currentNum = 0//start押すたびにリセットされる
    board.activate()
    startTime = Date.now()//start時の時間

    //ボタンを押すたびにタイマーが走ってしまう
    //もし timeoutId が undefined でなければ、つまりすでにタイマーが走っていたら、それを止めてあげればいいでしょう。
    if (typeof timeoutId !== 'undefined') {
      clearTimeout(timeoutId)
    }
    runTimer()
  })

  //タイマーに関する処理
  function runTimer() {
    //timer要素取得
    const timer = document.getElementById('timer')

    timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2)
    timeoutId = setTimeout(() => {
      runTimer()
    }, 10);
  }

}

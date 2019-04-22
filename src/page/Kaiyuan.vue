<template>

  <div class="kaiyuan">
      <span id="api_token" class="dsn">{{ api_token }}</span>
    <div v-if="loadingg" class="loadingg">
          <img src="/images/loadingg.gif" alt="">
    </div>
    <div id="container" style="display:none;">
       <div class="header">
        <div class="left fl">
          <span>棋牌余额:</span>
          <span class="paink price" v-text="qipaimoney">999999</span>
          <span class="iconfont icon-shuaxin paink" @click="getData"></span>
        </div>
        <div class="right fr" @click="gowalet">
          <span class="coins"></span><span style="font-size: 13px; position: absolute; right: 0.5rem">额度转换</span><span class="iconfont icon-jiantou-right fr" style="font-size: 10px;"></span>
        </div>
       </div>
        <!-- 一条虚线1-->
        <div style="border-bottom: 1px dashed #dcdfe6 ; margin-bottom: 0.2rem "></div>
        <div class="p">
        <span class="iconfont icon-yuan fl paink"></span><span class="fl">热门游戏</span></div>
        <!-- 两条横线1-->
        <div style=" height: 1px; background-color: #dcdfe6; margin-right: 0.5rem; margin-left: 0.5rem; margin-top: 0.05rem; margin-bottom: 0.4rem"></div>
        <!-- 热门游戏banner start-->
        <div id="hotgame" >
                    <ul id="bannerImg" v-for="item in bannerList" @click="goDetila(item.id)">
                        <li><img style="width:100px; height: 142px" :src="item.icon" alt=""></li>
                        <li id="describe">
                            <div v-text="item.title"></div>
                            <div  v-text="item.describe"></div>
                        </li>
                    </ul>
        </div>
        <div class="p"><span class="iconfont icon-yuan fl paink"></span><span class="fl">全部游戏</span></div>
        <!-- 两条横线2-->
        <div style=" height: 1px; background-color: #dcdfe6; margin-right: 0.5rem; margin-left: 0.5rem; margin-top: 0.05rem; margin-bottom: 0.4rem"></div>

       <!-- 游戏列表 start-->
       <div class="gamelist">
         <ul>
           <li @click="goYCdetial">
               <img src="/kaiyuan/yicai.png" alt="">
               <div style="font-size: 0.35rem; text-align: center;">易彩</div>
           </li>
           <li @click="sezi">
             <img src="/kaiyuan/s333.png" alt="">
             <div style="font-size: 0.35rem; text-align: center;">色子</div>
           </li>
           <li v-for="item in list" @click="goDetila(item.id)">
              <img :src="item.icon" alt="">
              <div v-text="item.title"></div>
           </li>
         </ul>
       </div>
      <!-- 游戏列表 end-->
      <!-- 棋牌快速转账弹框 -->
      <div :class="['alert',fazhi]">
           <h3>快速转账</h3>
           <ul class="alertul">
             <li><span class="mgright">转出:</span><span v-text="Math.floor(damomoney)"></span><span>(钻石钱包)</span></li>
             <li><span class="mgright">转入:</span><span v-text="Math.floor(qipaimoney)"></span><span>(棋牌钱包)</span></li>
             <li style="height: 0.5rem;line-height: 0.5rem;color: #757575;"><span style="margin-left: 1.1rem;font-size: 0.3rem;font-weight: normal;">转换额度：10钻石=1棋牌金币</span></li>
             <li><span class="mgright">金额:</span><input class="inputText" type="number" name="" v-model:value="JinE" placeholder="请输入转账金额"></li>
             <li class="height2">
               <button v-for="item in listE" v-text="item.name" :class="item.class" @click="btncount(item.name)"></button>
               <button class="long" @click="btnmax">最大值</button>
             </li>
           </ul>
           <ul class="btngroup">
             <li @click="Cashin" tabindex = "0">确认转入</li>
             <li @click="goChongZhi" tabindex = "0">去充值</li>
             <li @click="goGame" tabindex = "0">直接进入游戏</li>
             <li @click="cancel" tabindex = "0">取消</li>
           </ul>
        </div>
      <section :class="['cover',fazhi]"></section>
      <!-- 棋牌快速转账弹框 -->
        <!-- 棋牌弹框弹框 -->
      <section  :class="['cover2 copyAlert',showCopyAlert]">
        <div class="container">
          <div class="centen">
            <img :src="imgsrc" alt="" class="title">
            <p class="titleText"><span v-text="alertText"></span></p>
            <p v-if="ShowBtnGoGame" class="ShowBtnGoGame">
              <button type="button" name="button" class="btnsure btn" @click="btnsure">确定</button>
              <button type="button" name="button" class="btnsure btn" @click="goGame">去游戏</button>
            </p>
            <p v-if="ShowBtnSuer" class="ShowBtn">
              <button type="button" name="button" class="btnsure btn" @click="btnsure">确定</button>
            </p>
          </div>
        </div>
      </section>
      <section :class="['cover2',showCopyAlert]" ></section>
      <!-- 棋牌弹框弹框 -->


      <!-- 易彩钱包弹框开始 -->
        <div :class="['alert',cp]">
            <h3>快速转账</h3>
            <ul class="alertul">
                <li><span class="mgright">转出:</span><span v-text="Math.floor(damomoney)"></span><span>(钻石钱包)</span></li>
                <li><span class="mgright">转入:</span><span v-text="Math.floor(YCmoney)"></span><span>(易彩钱包)</span></li>
                <li style="height: 0.5rem;line-height: 0.5rem;color: #757575;"><span style="margin-left: 1.1rem;font-size: 0.3rem;font-weight: normal;">转换额度：10钻石=1易彩金币</span></li>
                <li><span class="mgright">金额:</span><input class="inputText" type="number" name="" v-model:value="JinEYC" placeholder="请输入转账金额"></li>
                <li class="height2">
                    <button v-for="item in listE" v-text="item.name" :class="item.class" @click="btncountYC(item.name)"></button>
                    <button class="long" @click="btnmaxYC">最大值</button>
                </li>
            </ul>
            <ul class="btngroup">
                <li @click="CashinYC"  tabindex = "0">确认转入</li>
                <li @click="goChongZhi"  tabindex = "0">去充值</li>
                <li @click="goGameYC"  tabindex = "0" style="color:#ee84ac ">直接进入易彩大厅</li>
                <li @click="goYCwallet"  tabindex = "0">易彩钱包转钻石钱包(额度转换)</li>
                <li @click="cancel"  tabindex = "0">取消</li>
            </ul>
        </div>
        <section :class="['cover',cp]"></section>
        <!-- 易彩快速转账弹框 -->
        <!-- 易彩弹框 -->
        <section  :class="['cover2 copyAlert',showCopyAlert]">
            <div class="container">
                <div class="centen">
                    <img :src="imgsrc" alt="" class="title">
                    <p class="titleText"><span v-text="alertText"></span></p>
                    <p v-if="ShowBtnGoGame" class="ShowBtnGoGame">
                        <button type="button" name="button" class="btnsure btn" @click="btnsure">确定</button>
                        <button type="button" name="button" class="btnsure btn" @click="goGame">去易彩大厅</button>
                    </p>
                    <p v-if="ShowBtnSuer" class="ShowBtn">
                        <button type="button" name="button" class="btnsure btn" @click="btnsure">确定</button>
                    </p>
                </div>
            </div>
        </section>
        <section :class="['cover2',showCopyAlert]" ></section>
        <!-- 易彩钱包弹框结束 -->
    </div>
  </div>
</template>


 <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js" charset="utf-8"></script>
 <script src="https://unpkg.com/element-ui/lib/index.js"></script>
 <script src="http://lib.baomitu.com/jquery/2.1.1/jquery.min.js"></script>
<script>
      !function(N,M){function L(){var a=I.getBoundingClientRect().width;a/F>1024&&(a=1024*F);var d=a/10;I.style.fontSize=d+"px",D.rem=N.rem=d}var K,J=N.document,I=J.documentElement,H=J.querySelector('meta[name="viewport"]'),G=J.querySelector('meta[name="flexible"]'),F=0,E=0,D=M.flexible||(M.flexible={});if(H){/*console.warn("将根据已有的meta标签来设置缩放比例");*/var C=H.getAttribute("content").match(/initial\-scale=([\d\.]+)/);C&&(E=parseFloat(C[1]),F=parseInt(1/E))}else{if(G){var B=G.getAttribute("content");if(B){var A=B.match(/initial\-dpr=([\d\.]+)/),z=B.match(/maximum\-dpr=([\d\.]+)/);A&&(F=parseFloat(A[1]),E=parseFloat((1/F).toFixed(2))),z&&(F=parseFloat(z[1]),E=parseFloat((1/F).toFixed(2)))}}}if(!F&&!E){var y=N.navigator.userAgent,x=(!!y.match(/android/gi),!!y.match(/iphone/gi)),w=x&&!!y.match(/OS 9_3/),v=N.devicePixelRatio;F=x&&!w?v>=3&&(!F||F>=3)?3:v>=2&&(!F||F>=2)?2:1:1,E=1/F}if(I.setAttribute("data-dpr",F),!H){if(H=J.createElement("meta"),H.setAttribute("name","viewport"),H.setAttribute("content","initial-scale="+E+", maximum-scale="+E+", minimum-scale="+E+", user-scalable=no"),I.firstElementChild){I.firstElementChild.appendChild(H)}else{var u=J.createElement("div");u.appendChild(H),J.write(u.innerHTML)}}N.addEventListener("resize",function(){clearTimeout(K),K=setTimeout(L,300)},!1),N.addEventListener("pageshow",function(b){b.persisted&&(clearTimeout(K),K=setTimeout(L,300))},!1),"complete"===J.readyState?J.body.style.fontSize=12*F+"px":J.addEventListener("DOMContentLoaded",function(){J.body.style.fontSize=12*F+"px"},!1),L(),D.dpr=N.dpr=F,D.refreshRem=L,D.rem2px=function(d){var c=parseFloat(d)*this.rem;return"string"==typeof d&&d.match(/rem$/)&&(c+="px"),c},D.px2rem=function(d){var c=parseFloat(d)/this.rem;return"string"==typeof d&&d.match(/px$/)&&(c+="rem"),c}}(window,window.lib||(window.lib={}));
</script>
<script>
export default {
    data() {
              return {
                /*
                 *易彩钱包数据
                */
                cp:"dsn",  // 控制show class
                //iconYC:false,
                JinEYC:"", // 易彩钱包金额
                YCmoney:"", // 易彩钱包返回余额
                YCid:'', // 易彩金额传值


                /*
                 *易彩钱包数据
                */

                loadingg:true,
                imgsrc:'', // 图片地址
                ShowBtnGoGame:false,
                ShowBtnSuer:false,
                isFinish:true,
                count:0,
                alertText:'',
                qipaimoney:'',
                damomoney:'',
                showCopyAlert:'dsn',
                api_token:"af343e2197bbfc802e741cc26e67d021",
                //ip:window.location.origin,
                ip:'http://zb-api-ceshi.mekxfj.com',
                copyAlert:false,
                loading:false,
                listE:[
                  {name:'100'},
                  {name:'500'},
                  {name:'1000'},
                ],
                JinE:'',
                id:'',
                fazhi:'dsn',
                list:[
                  {title:'押龙虎',icon:'/kaiyuan/ylh.png',id:'900'},
                  {title:'百家乐',icon:'/kaiyuan/bjl.png',id:'910'},
                  {title:'炸金花',icon:'/kaiyuan/zjh.png',id:'220'},
                  {title:'抢庄牛牛',icon:'/kaiyuan/zqnn.png',id:'830'},
                  {title:'二八杠',icon:'/kaiyuan/ebg.png',id:'720'},
                  {title:'二十一点',icon:'/kaiyuan/21.png',id:'600'},
                  {title:'三公',icon:'/kaiyuan/sg.png',id:'860'},
                  {title:'德州扑克',icon:'/kaiyuan/dzpk.png',id:'620'},
                  {title:'通比牛牛',icon:'/kaiyuan/tbnn.png',id:'870'},
                  {title:'斗地主',icon:'/kaiyuan/ddz.png',id:'610'},
                  {title:'百人牛牛',icon:'/kaiyuan/brnn.png',id:'930'},
                  {title:'森林舞会',icon:'/kaiyuan/slwh.png',id:'920'},
                  {title:'抢庄牌九',icon:'/kaiyuan/zqpj.png',id:'730'},
                  {title:'极速炸金花',icon:'/kaiyuan/jszjh.png',id:'230'},
                  {title:'十三水',icon:'/kaiyuan/sss.png',id:'630'},
                ],
                bannerList:[
                    {title:'押龙虎',describe:'挑战世界第一',icon:'/kaiyuan/ylhhot.png',id:'620'},
                    {title:'百家乐',describe:'最公平公正',icon:'/kaiyuan/bjlhot.png',id:'910'},
                    {title:'炸金花',describe:'简单轻松上手',icon:'/kaiyuan/zjhhot.png',id:'220'},
                    {title:'抢庄牛牛',describe:'抢庄翻倍',icon:'/kaiyuan/qznnhot.png',id:'830'},
                    {title:'二十一点',describe:'经典棋牌玩法',icon:'/kaiyuan/21hot.png',id:'600'},
                    {title:'二八杠',describe:'比胆略比智慧',icon:'/kaiyuan/ebghot.png',id:'720'},
                ],
                timeout:true,
              }
},
    components: {
  },
            methods: {
            // 公用请求
            network(url, data, fun) {
              if (!data) {
                $.ajax({
                  type: "GET",
                  url:  url,
                  headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                  },
                  ContentType: "application/x-www-form-urlencoded",
                  dataType: "json",
                  success: function(data) {
                    fun(data)
                  },
                  error: function(data) {
                    fun(data)
                  }
                });
              } else {
                $.ajax({
                  type: "POST",
                  url:  url,
                  data: data,
                  headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                  },
                  ContentType: "application/x-www-form-urlencoded",
                  dataType: "json",
                  success: function(data) {
                    fun(data)
                  },
                  error: function(data) {
                    // fun(data)
                  }
                });
              }
            },
            sezi(){
              let ip='http://sezi.aibay.live'
              let api_token=this.api_token
              window.location.href=ip+'?token='+api_token
              // console.log(ip+'/api/dice/play?token='+api_token)
            },
            /*
             * 易彩彩票方法开始
            */
            //点开弹窗
            goYCdetial(){
                this.JinEYC=null
                this.cp='dsb'

            },

            // 直接进入彩票大厅
            goGameYC(){
                let ip=this.ip;
                let api_token=this.api_token;
                this.network(ip + "/api/ticket/login?api_token="+api_token, null, res=>{
                    if(res.status===0){
                        //console.log(res.data.split("homeurl="))
                        let backHome = res.data.split("homeurl=")
                        backHome = backHome[0] + "homeurl="+ ip + "/api/chess/gameList?api_token=" + api_token
                        window.location.href= backHome
                        //console.log(backHome)

                    }else{
                        setTimeout(()=>{
                            this.alertText=res.message
                            this.copyAlert=true
                        },30000)
                    }
                })
            },
            CashinYC(){//确认转入
                  this.loading=true
                  let isFinish=this.isFinish
                  let JinEYC
                  if(this.JinEYC==null){
                      JinEYC=0
                  }else{
                      JinEYC=parseInt(this.JinEYC)
                  }
                  let ip=this.ip
                  let damomoney=parseInt(this.damomoney)
                  let api_token=this.api_token
                  let count=this.count
                  this.count++
                  if(JinEYC<10||typeof(JinEYC)!="number"){
                      this.copyAlert=true
                      this.ShowBtnSuer=true
                      this.ShowBtnGoGame=false
                      this.imgsrc='/images/faild.png'
                      this.alertText="输入金额不得小于10"
                      this.loading=false
                      this.showCopyAlert="dsb"
                  }else if(JinEYC*10>damomoney){
                      this.copyAlert=true
                      this.ShowBtnSuer=true
                      this.ShowBtnGoGame=false
                      this.imgsrc='/images/faild.png'
                      this.alertText="金额超出可转换的最大金额"
                      this.loading=false
                      this.showCopyAlert="dsb"
                  }else if(isFinish==true){
                      this.isFinish=false
                      this.network(ip+"/api/ticket/transfer?api_token="+api_token+"&method=in&money="+JinEYC*10, null, res=>{
                          if(res.status==0){
                              this.getYCData()
                              this.loading=false
                              this.isFinish=true
                              // this.fazhi="dsn"
                              this.ShowBtnGoGame=false
                              this.ShowBtnSuer=true
                              this.imgsrc='/images/coins.png'
                              this.alertText="你可以去首页查看账户余额"
                              this.copyAlert=true
                              this.showCopyAlert="dsb"
                          }else{
                              this.loading=false
                              this.isFinish=true
                              setTimeout(()=>{
                                  this.alertText=res.message
                                  this.copyAlert=true
                                  this.showCopyAlert="dsb"
                              },10000)
                          }
                      })
                  }
              },
            goYCwallet(){
                let origin=window.location.origin
                let api_token=this.api_token
                window.location.href =origin+"/api/ticket/index?api_token="+api_token;
            },
            getYCData(){
                this.loading=true
                let ip=this.ip
                let api_token=this.api_token
                this.network(ip+"/api/ticket/balance?api_token="+api_token, null, res=>{
                    if(res.status==0){
                        this.loadingg=false
                        console.log(res)
                        document.getElementById("container").style="display:block"
                        document.getElementById("app").style=""
                        this.loading=false
                        this.YCmoney=res.data.game_money
                        this.damomoney=res.data.deposit
                    }else{
                        setTimeout(()=>{
                            this.alertText=res.message
                            this.copyAlert=true
                        },10000)
                    }
                })
            },
            btncountYC(YCid){//金额按钮
                  this.JinEYC=YCid
            },
            btnmaxYC(){//转出最大金额
                  this.JinEYC=this.damomoney/10
              },



              /*
              * 易彩彩票方法结束
              * */
            btnsure(){
              this.copyAlert=false
              this.showCopyAlert="dsn"
            },
            getData(){//获取参数
              this.loading=true
              let ip=this.ip
              let api_token=this.api_token
              this.network(ip+"/api/chess/balance?api_token="+api_token, null, res=>{
                  if(res.status==0){
                    this.loadingg=false
                      console.log(res)
                      document.getElementById("container").style="display:block"
                      document.getElementById("app").style=""
                    this.loading=false
                    this.qipaimoney=res.data.money
                    this.damomoney=res.data.deposit
                  }else{
                    setTimeout(()=>{
                      this.alertText=res.message
                      this.copyAlert=true
                    },10000)
                  }
              })
            },
            goDetila(id){
              this.id=id
              this.JinE=null
              this.fazhi='dsb'
            },
            goGame(){
              //直接进入游戏
              let id=this.id;
              let ip=this.ip;
              let api_token=this.api_token;
              this.network(ip+"/api/chess/login?api_token="+api_token+"&kind_id="+id, null, res=>{
                if(res.status==0){

                  location.href=res.url
                }else{
                  setTimeout(()=>{
                    this.alertText=res.message
                    this.copyAlert=true
                  },30000)
                }
              })
            },
            goChongZhi(){//去充值
              let api_token=this.api_token
              let origin=window.location.origin
              location.href =origin+"/api/pay/rechargeH5?api_token="+api_token;
            },
            Cashin(){//确认转入
              this.loading=true
              let isFinish=this.isFinish
              let JinE
              if(this.JinE==null){
                JinE=0
              }else{
                JinE=parseInt(this.JinE)
              }
              let ip=this.ip
              let damomoney=parseInt(this.damomoney)
              let api_token=this.api_token
              let count=this.count
                  this.count++
                if(JinE<10||typeof(JinE)!="number"){
                    this.copyAlert=true
                    this.ShowBtnSuer=true
                    this.ShowBtnGoGame=false
                    this.imgsrc='/images/faild.png'
                    this.alertText="输入金额不得小于10"
                    this.loading=false
                    this.showCopyAlert="dsb"
                }else if(JinE*10>damomoney){
                  this.copyAlert=true
                  this.ShowBtnSuer=true
                  this.ShowBtnGoGame=false
                  this.imgsrc='/images/faild.png'
                  this.alertText="金额超出可转换的最大金额"
                  this.loading=false
                  this.showCopyAlert="dsb"
                }else if(isFinish==true){
                  this.isFinish=false
                  this.network(ip+"/api/chess/transfer?api_token="+api_token+"&method=in&money="+JinE*10, null, res=>{
                      if(res.status==0){
                         this.getData()
                          console.log(res)
                         this.loading=false
                         this.isFinish=true
                         // this.fazhi="dsn"
                         this.ShowBtnGoGame=false
                         this.ShowBtnSuer=true
                         this.imgsrc='/images/coins.png'
                         this.alertText="你可以去首页查看账户余额"
                         this.copyAlert=true
                         this.showCopyAlert="dsb"
                      }else{
                         this.loading=false
                         this.isFinish=true
                         setTimeout(()=>{
                           this.alertText=res.message
                           this.copyAlert=true
                           this.showCopyAlert="dsb"
                         },10000)
                      }
                  })
              }

            },
            btncount(id){//金额按钮
               this.JinE=id
            },
            cancel(){
              this.fazhi='dsn'
              this.cp='dsn'
            },
            gowalet(){//去钱包页
              let origin=window.location.origin
              let api_token=this.api_token
              window.location.href =origin+"/api/chess/wallet?api_token="+api_token;
            },
            btnmax(){//转出最大金额
              this.JinE=this.damomoney/10
            },
          },
          mounted(){},
          updated() {

          },
          created() {
              this.getData()
              this.getYCData()

          },
}
</script>

  <style lang="scss" scoped>
    *{ margin:0; padding:0; }
    /* color:#757575; */
    li{list-style:none;}
    html{overflow-y:scroll;font-size:0.4rem;}
    body{background: #f6f6f6;user-select: none;onselectstart:none}
    .fl{float:left ;}
    .left{margin-top: 0.2rem}
    .fr{float:right }
    .dsn{display:none!important}
    .dsb{display:block!important}
    .paink{color:#ee84ac; font-weight: 900 ; margin-right: 0.05rem}
    .black{color:#000;height: 2rem;line-height: 2rem;}
    .price{padding: 0rem 0.3rem;}
    #app{font-size: 0.33rem;background: #fff;}
    .gamelist ul li{display: inline-block;width: 20vw; height:25vw; text-align: center;font-size: 0.4rem;  margin: 0 auto; padding: 0.15rem 0.2rem}
    .gamelist ul li img{height: 1.6rem;width: 1.54rem;}
    .alert{display:none;position: fixed;top:2.2rem;left: 14%;width: 7rem;background: #f9f9f9;font-size: 0.35rem;border-radius: 0.5rem;z-index: 11;}
    .alert h3{text-align: center;color: #000;margin-top: 0.2rem;}
    .alert p{text-align: left;height: 0.6rem;line-height: 0.6rem;margin: 0.1rem 0rem;color: #000;}
    .alert p span{color: #000;}
    .p{height: 1rem;line-height: 1rem;padding: 0rem 0.4rem;background: #fff;margin: 0.05rem 0rem;text-align: left; }
    .header .right{height: 0.75rem;background:#ee84ac;line-height: 0.75rem;width: 2.75rem;color: #fff;margin-top: 0.3rem;}
    .header .coins{float: left;width:1.07rem;height: 1.06rem;background: url("/kaiyuan/coin.png")no-repeat;background-size: 100%;position:relative;right: 0.3rem;top: -0.1rem;margin-top: 1px; margin-left: 3px}
    .header{height: 1rem;line-height: 1rem;background: #fff;padding-left: 0.4rem; margin-bottom: 0.5rem}
    .alertul .height2{height: 2rem;width: 5.4rem;margin-left: 1rem;}
    .mgright{margin-right:4%;}
    .gamelist{padding: 1vw;}
    .gamelist div{font-size: 0.35rem; text-align: center;}
    .alertul{padding:0.2rem;}
    .alertul .long{width: 5.2rem;}
    .alertul li button{width: 1.6rem;height: 0.7rem;line-height: 0.7rem;margin: 0.1rem;background: #fff;border: 0.02rem solid #b5b5b5;color: #515151;}
    .inputText{border:0.02rem solid #b5b5b5;width: 5rem;-webkit-appearance:none;height: 0.7rem;color: #000;padding-left: 0.2rem;}
    .alertul li{height:1rem;line-height: 1rem;color: #000;font-weight: bold;}
    .btngroup li{font-weight: bold;display: block;height:1.2rem;line-height: 1.2rem;
      color:#409eff;text-align: center;
      border-bottom-right-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
      border-top: 0.02rem solid #e2e1e1;background: #fefbfb;}
    .el-loading-mask{background-color: rgba(255, 255, 255, 0.1);z-index: 30;}
    #app .copyAlert{text-align: center;font-size: 0.4rem;z-index: 13;}
    .copyAlert .title{position: relative;top: -1.9rem;height: 3rem;}
    .copyAlert .title span{color: #fff;}
    .copyAlert .btnsure{background: #ee84ac;color: #fff;height: 0.8rem;width: 2.5rem;border-radius: 0.1rem;border: 0.1rem solid #ee84ac;}
    .copyAlert .btn{background: url(/images/btn.png);border: none;}
    .cover{height: 100%;  width: 100%;background: rgba(0, 0, 0, 0.3);position: fixed;top: 0;z-index: 5;}
    .copyAlert .centen{background: #fff;position: relative;top: -1rem;height: 4.5rem;width: 6.5rem;border-radius: 0.1rem;}
    .copyAlert .centen .ShowBtnGoGame{position: absolute;bottom: 0;width: 100%;font-size: 0;}
    .copyAlert .centen .ShowBtnGoGame button{width: 50%;border-radius: 0;height: 1rem;}
    .container{width: 6.5rem;margin: 65% auto;}
    .titleText{color:#000;height: 2rem;line-height: 2rem;position: relative;top: -2rem;width: 5rem;margin: 0 auto;}
    .ShowBtn{position: absolute;bottom: 0.3rem;width: 100%;font-size: 0;}
    .cover2{height: 100%;width: 100%;background: rgba(0, 0, 0, 0.3);position: fixed;z-index: 11;top: 0;}
    .loadingg{height: 100%;text-align: center;}
    .loadingg img{height: 4rem;vertical-align: middle;position: relative;top: 25%;}
    /*热门游戏style*/
    #hotgame{margin-right: 0.5rem;margin-left: 0.5rem;padding: 2px;display: flex;-webkit-flex-flow:row nowrap;flex-flow:row nowrap;list-style: none;overflow-y: hidden;-webkit-overflow-scrolling:touch;}
    #hotgame ::-webkit-scrollbar{ overflow-x: scroll;height: 1.7vw; }
    #hotgame ::-webkit-scrollbar-thumb{ background-color: #ee84ac; border-radius: 50px}
    #bannerImg{float: left;width: 130px;height: 157px;padding-top: 5px;margin-right: 0.5rem;position: relative;}
    #hotgame ul{float: left;}
    #describe{width: 16vw;height: 50px;color: #ffffff;left: 20px;top: 100px;position: absolute;margin-left: 0.01rem; margin-top: 5px}
    #describe div:first-child{ text-align: center ; font-size: 3.5vw ;width: 15vw;}
    #describe div:nth-child(2){ text-align: center ;  font-size: 2.5vw; font-weight: lighter ;}
    /*易彩弹框样式*/
    /*点击弹框的按钮背景变色*/
    @-webkit-keyframes flash { 100% {background-color: #409EFF;color: #ffffff} }
    .btngroup li:focus{outline-style: none;border-radius:0;-webkit-animation-name: flash;-webkit-animation-duration: 300ms;-webkit-animation-iteration-count: 1;-webkit-animation-timing-function: ease-in-out;}
  </style>
<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="币种充提统计" name="h5Coin">

        <table class="table" width="100%">
          <caption>
            <h2>IA币区块转账充值统计</h2>
          </caption>
          <tr>
            <td>今日充值金额</td>
            <td>{{ IA_sum.today }}</td>
            <td>今日充值单数</td>
            <td>{{ IA_count.today }}</td>
          </tr>
          <tr>
            <td>昨天充值金额</td>
            <td>{{ IA_sum.lastday }}</td>
            <td>昨天充值单数</td>
            <td>{{ IA_count.lastday }}</td>
          </tr>
          <tr>
            <td>本月充值金额</td>
            <td>{{ IA_sum.tomonth }}</td>
            <td>本月充值单数</td>
            <td>{{ IA_count.tomonth }}</td>
          </tr>
          <tr>
            <td>上月充值金额</td>
            <td>{{ IA_sum.lastmonth }}</td>
            <td>上月充值单数</td>
            <td>{{ IA_count.lastmonth }}</td>
          </tr>
          <tr>
            <td>今年充值金额</td>
            <td>{{ IA_sum.toyear }}</td>
            <td>今年充值单数</td>
            <td>{{ IA_count.toyear }}</td>
          </tr>
          <tr>
            <td>去年充值金额</td>
            <td>{{ IA_sum.lastyear }}</td>
            <td>去年充值单数</td>
            <td>{{ IA_count.lastyear }}</td>
          </tr>
          <tr>
            <td>累计充值金额</td>
            <td>{{ IA_sum.all }}</td>
            <td>累计充值单数</td>
            <td>{{ IA_sum.all }}</td>
          </tr>
        </table>
        <div style="height: 350px;"></div>

        <div v-for="(item, index) in coinList" :key="index" style="margin-left: 50px;">
          <span class="title">币种:{{ item.Name }}</span>

          <div v-for="(a, i) in h5CoinList" :key="i">
            <div v-if="item.Id == i">
              <!--              <div v-if="a.Recharge">
                <span class="content">
                  <span style="color: green; font-size: 20px;">充值统计:</span>
                  <br />
                  <span class="content" v-if="a.Recharge.today">
                    今日金额:{{ a.Recharge.today.Money }} &nbsp;&nbsp;&nbsp;&nbsp;共{{ a.Recharge.today.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Recharge.lastday">
                    昨天金额:{{ a.Recharge.lastday.Money }} &nbsp;&nbsp;&nbsp;&nbsp;共{{ a.Recharge.lastday.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Recharge.tomonth">
                    本月金额:{{ a.Recharge.tomonth.Money }} &nbsp;&nbsp;&nbsp;&nbsp;共{{ a.Recharge.tomonth.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Recharge.lastmonth">
                    上月金额:{{ a.Recharge.lastmonth.Money }} &nbsp;&nbsp;&nbsp;&nbsp;共{{ a.Recharge.lastmonth.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Recharge.toyear">
                    今年金额:{{ a.Recharge.toyear.Money }} &nbsp;&nbsp;&nbsp;&nbsp;共{{ a.Recharge.toyear.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Recharge.lastyear">
                    去年金额:{{ a.Recharge.lastyear.Money }} &nbsp;&nbsp;&nbsp;&nbsp;共{{ a.Recharge.lastyear.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Recharge.all">
                    累计金额:{{ a.Recharge.all.Money }}&nbsp;&nbsp;&nbsp;&nbsp; 共{{ a.Recharge.all.Total }}单
                    <br />
                  </span>
                </span>
              </div> -->
              <div v-if="a.Recharge">
                <table class="table" width="100%">
                  <caption>
                    <h2>充值统计</h2>
                  </caption>
                  <tr v-if="a.Recharge.today">
                    <td>今日充值金额</td>
                    <td>{{ a.Recharge.today.Money }}</td>
                    <td>今日充值单数</td>
                    <td>{{ a.Recharge.today.Total }}</td>
                  </tr>
                  <tr v-if="a.Recharge.lastday">
                    <td>昨天充值金额</td>
                    <td>{{ a.Recharge.lastday.Money }}</td>
                    <td>昨天充值单数</td>
                    <td>{{ a.Recharge.lastday.Total }}</td>
                  </tr>
                  <tr v-if="a.Recharge.tomonth">
                    <td>该月充值金额</td>
                    <td>{{ a.Recharge.tomonth.Money }}</td>
                    <td>该月充值单数</td>
                    <td>{{ a.Recharge.tomonth.Total }}</td>
                  </tr>
                  <tr v-if="a.Recharge.lastmonth">
                    <td>上月充值金额</td>
                    <td>{{ a.Recharge.lastmonth.Money }}</td>
                    <td>上月充值单数</td>
                    <td>{{ a.Recharge.lastmonth.Total }}</td>
                  </tr>
                  <tr v-if="a.Recharge.toyear">
                    <td>今年充值金额</td>
                    <td>{{ a.Recharge.toyear.Money }}</td>
                    <td>今年充值单数</td>
                    <td>{{ a.Recharge.toyear.Total }}</td>
                  </tr>
                  <tr v-if="a.Recharge.lastyear">
                    <td>去年充值金额</td>
                    <td>{{ a.Recharge.lastyear.Money }}</td>
                    <td>去年充值单数</td>
                    <td>{{ a.Recharge.lastyear.Total }}</td>
                  </tr>
                  <tr v-if="a.Recharge.all">
                    <td>累计充值金额</td>
                    <td>{{ a.Recharge.all.Money }}</td>
                    <td>累计充值单数</td>
                    <td>{{ a.Recharge.all.Total }}</td>
                  </tr>
                </table>
              </div>
              <div v-if="a.Withdraw">
                <!--                <span class="content">
                  <span style="color: red; font-size: 20px;">提现统计:</span>
                  <br />
                  <span class="content" v-if="a.Withdraw.today">
                    今日金额:{{ a.Withdraw.today.Money }} &nbsp;&nbsp;&nbsp;&nbsp;提现{{ a.Withdraw.today.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Withdraw.lastday">
                    昨天金额:{{ a.Withdraw.lastday.Money }} &nbsp;&nbsp;&nbsp;&nbsp;提现{{ a.Withdraw.lastday.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Withdraw.tomonth">
                    本月金额:{{ a.Withdraw.tomonth.Money }} &nbsp;&nbsp;&nbsp;&nbsp;提现{{ a.Withdraw.tomonth.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Withdraw.lastmonth">
                    上月金额:{{ a.Withdraw.lastmonth.Money }} &nbsp;&nbsp;&nbsp;&nbsp;提现{{ a.Withdraw.lastmonth.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Withdraw.toyear">
                    今年金额:{{ a.Withdraw.toyear.Money }} &nbsp;&nbsp;&nbsp;&nbsp;提现{{ a.Withdraw.toyear.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Withdraw.lastyear">
                    去年金额:{{ a.Withdraw.lastyear.Money }} &nbsp;&nbsp;&nbsp;&nbsp;提现{{ a.Withdraw.lastyear.Total }}单
                    <br />
                  </span>
                  <span class="content" v-if="a.Withdraw.all">
                    累计金额:{{ a.Withdraw.all.Money }} &nbsp;&nbsp;&nbsp;&nbsp;提现{{ a.Withdraw.all.Total }}单
                    <br />
                  </span>
                  <br />
                </span> -->


                <table class="table" width="100%">
                  <caption>
                    <h2>提现统计</h2>
                  </caption>
                  <tr v-if="a.Withdraw.today">
                    <td>今日提现金额</td>
                    <td>{{ a.Withdraw.today.Money }}</td>
                    <td>今日提现单数</td>
                    <td>{{ a.Withdraw.today.Total }}</td>
                  </tr>
                  <tr v-if="a.Withdraw.lastday">
                    <td>昨天提现金额</td>
                    <td>{{ a.Withdraw.lastday.Money }}</td>
                    <td>昨天提现单数</td>
                    <td>{{ a.Withdraw.lastday.Total }}</td>
                  </tr>
                  <tr v-if="a.Withdraw.tomonth">
                    <td>该月提现金额</td>
                    <td>{{ a.Withdraw.tomonth.Money }}</td>
                    <td>该月提现单数</td>
                    <td>{{ a.Withdraw.tomonth.Total }}</td>
                  </tr>
                  <tr v-if="a.Withdraw.lastmonth">
                    <td>上月提现金额</td>
                    <td>{{ a.Withdraw.lastmonth.Money }}</td>
                    <td>上月提现单数</td>
                    <td>{{ a.Withdraw.lastmonth.Total }}</td>
                  </tr>
                  <tr v-if="a.Withdraw.toyear">
                    <td>今年提现金额</td>
                    <td>{{ a.Withdraw.toyear.Money }}</td>
                    <td>今年提现单数</td>
                    <td>{{ a.Withdraw.toyear.Total }}</td>
                  </tr>
                  <tr v-if="a.Withdraw.lastyear">
                    <td>去年提现金额</td>
                    <td>{{ a.Withdraw.lastyear.Money }}</td>
                    <td>去年提现单数</td>
                    <td>{{ a.Withdraw.lastyear.Total }}</td>
                  </tr>
                  <tr v-if="a.Withdraw.all">
                    <td>累计提现金额</td>
                    <td>{{ a.Withdraw.all.Money }}</td>
                    <td>累计提现单数</td>
                    <td>{{ a.Withdraw.all.Total }}</td>
                  </tr>

                </table>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="孵化统计" name="order">
        <div style="margin-left: 50px;">
          <table class="table" width="60%">
            <caption>
              <h2>用户扩展统计</h2>
            </caption>
            <tr>
              <td>累计孵化积分</td>
              <td>{{ IAMemberExtend.Score }}</td>
              <td>累计团队孵化积分</td>
              <td>{{ IAMemberExtend.TeamScore }}</td>
            </tr>
          </table>

          <table v-if="IALockStoreRewardLog.today" class="table" width="60%">
            <caption>
              <h2>收益发放统计</h2>
            </caption>
            <tr>
              <td>日期</td>
              <td>静态收益未拆分</td>
              <td>团队收益未拆分</td>
              <td>直推收益</td>
              <td>静态收益未拆分单数</td>
              <td>团队收益单数</td>
              <td>直推收益单数</td>
            </tr>
            <tr v-if="IALockStoreRewardLog.today[0]">
              <td>今日统计</td>
              <td v-for="(item,index) in IALockStoreRewardLog.today">{{item.sum}}</td>
              <td v-for="(item,index) in IALockStoreRewardLog.today">{{item.count}}</td>
            </tr>
            <tr v-else>
              <td>今日统计</td>
              <td v-for="item in 6">0</td>
            </tr>
            <tr v-if="IALockStoreRewardLog.lastday[0]">
              <td>昨天统计</td>
              <td v-for="(item,index) in IALockStoreRewardLog.lastday">{{item.sum}}</td>
              <td v-for="(item,index) in IALockStoreRewardLog.lastday">{{item.count}}</td>
            </tr>
            <tr v-else>
              <td>昨天统计</td>
              <td v-for="item in 6">0</td>
            </tr>
            <tr v-if="IALockStoreRewardLog.tomonth[0]">
              <td>该月统计</td>
              <td v-for="(item,index) in IALockStoreRewardLog.tomonth">{{item.sum}}</td>
              <td v-for="(item,index) in IALockStoreRewardLog.tomonth">{{item.count}}</td>
            </tr>
            <tr v-else>
              <td>该月统计</td>
              <td v-for="item in 6">0</td>
            </tr>
            <tr v-if="IALockStoreRewardLog.lastmonth[0]">
              <td>上月统计</td>
              <td v-for="(item,index) in IALockStoreRewardLog.lastmonth">{{item.sum}}</td>
              <td v-for="(item,index) in IALockStoreRewardLog.lastmonth">{{item.count}}</td>
            </tr>
            <tr v-else>
              <td>上月统计</td>
              <td v-for="item in 6">0</td>
            </tr>
            <tr v-if="IALockStoreRewardLog.toyear[0]">
              <td>今年统计</td>
              <td v-for="(item,index) in IALockStoreRewardLog.toyear">{{item.sum}}</td>
              <td v-for="(item,index) in IALockStoreRewardLog.toyear">{{item.count}}</td>
            </tr>
            <tr v-else>
              <td>今年统计</td>
              <td v-for="item in 6">0</td>
            </tr>
            <tr v-if="IALockStoreRewardLog.lastyear[0]">
              <td>去年统计</td>
              <td v-for="(item,index) in IALockStoreRewardLog.lastyear">{{item.sum}}</td>
              <td v-for="(item,index) in IALockStoreRewardLog.lastyear">{{item.count}}</td>
            </tr>
            <tr v-else>
              <td>去年统计</td>
              <td v-for="item in 6">0</td>
            </tr>
            <tr>
              <td>累计统计</td>
              <td v-for="(item,index) in IALockStoreRewardLog.all">{{item.sum}}</td>
              <td v-for="(item,index) in IALockStoreRewardLog.all">{{item.count}}</td>
            </tr>
          </table>

        </div>
      </el-tab-pane>
      <el-tab-pane label="会员统计" name="members">
        <div style="margin-left: 50px;">
          <table class="table" width="60%">
            <caption>
              <h2>会员统计</h2>
            </caption>
            <tr>
              <td>今日注册会员数</td>
              <td>{{ Members.today }}</td>
            </tr>
            <tr>
              <td>昨日注册会员数</td>
              <td>{{ Members.lastday }}</td>
            </tr>
            <tr>
              <td>该月注册会员数</td>
              <td>{{ Members.tomonth }}</td>
            </tr>
            <tr>
              <td>上月注册会员数</td>
              <td>{{ Members.lastmonth }}</td>
            </tr>
            <tr>
              <td>今年注册会员数</td>
              <td>{{ Members.toyear }}</td>
            </tr>
            <tr>
              <td>去年注册会员数</td>
              <td>{{ Members.lastyear }}</td>
            </tr>
            <tr>
              <td>总的注册会员数</td>
              <td>{{ Members.all }}</td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="活动统计" name="work">
        <div style="margin-left: 50px;">
          <table class="table" width="60%">
            <caption>
              <h2>活动统计</h2>
            </caption>
            <tr>
              <td>今日锁仓数量</td>
              <td>{{ Works.today }}</td>
            </tr>
            <tr>
              <td>昨日锁仓数量</td>
              <td>{{ Works.lastday }}</td>
            </tr>
            <tr>
              <td>该月锁仓数量</td>
              <td>{{ Works.tomonth }}</td>
            </tr>
            <tr>
              <td>上月锁仓数量</td>
              <td>{{ Works.lastmonth }}</td>
            </tr>
            <tr>
              <td>今年锁仓数量</td>
              <td>{{ Works.toyear }}</td>
            </tr>
            <tr>
              <td>去年锁仓数量</td>
              <td>{{ Works.lastyear }}</td>
            </tr>
            <tr>
              <td>总的锁仓数量</td>
              <td>{{ Works.all }}</td>
            </tr>
          </table>

          <table class="table" width="60%">
            <caption>
              <h2>发放统计</h2>
            </caption>
            <tr>
              <td>今日发放奖励</td>
              <td>{{ Comment.today }}</td>
            </tr>
            <tr>
              <td>昨日发放奖励</td>
              <td>{{ Comment.lastday }}</td>
            </tr>
            <tr>
              <td>该月发放奖励</td>
              <td>{{ Comment.tomonth }}</td>
            </tr>
            <tr>
              <td>上月发放奖励</td>
              <td>{{ Comment.lastmonth }}</td>
            </tr>
            <tr>
              <td>今年发放奖励</td>
              <td>{{ Comment.toyear }}</td>
            </tr>
            <tr>
              <td>去年发放奖励</td>
              <td>{{ Comment.lastyear }}</td>
            </tr>
            <tr>
              <td>总的发放奖励</td>
              <td>{{ Comment.all }}</td>
            </tr>
          </table>

          <table class="table" width="60%">
            <caption>
              <h2>释放统计</h2>
            </caption>
            <tr>
              <td>今日释放量</td>
              <td>{{ Record.today }}</td>
            </tr>
            <tr>
              <td>昨日释放量</td>
              <td>{{ Record.lastday }}</td>
            </tr>
            <tr>
              <td>该月释放量</td>
              <td>{{ Record.tomonth }}</td>
            </tr>
            <tr>
              <td>上月释放量</td>
              <td>{{ Record.lastmonth }}</td>
            </tr>
            <tr>
              <td>今年释放量</td>
              <td>{{ Record.toyear }}</td>
            </tr>
            <tr>
              <td>去年释放量</td>
              <td>{{ Record.lastyear }}</td>
            </tr>
            <tr>
              <td>总的释放量</td>
              <td>{{ Record.all }}</td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    statistics
  } from '@/api/user.js';
  import waves from '@/directive/waves';
  import {
    parseTime
  } from '@/utils';
  import Pagination from '@/components/Pagination';
  import permission from '@/directive/permission/index.js';
  import Upload from '@/components/Upload/SingleImage3';

  export default {
    components: {
      Pagination,
      Upload
    },
    directives: {
      waves,
      permission
    },
    data() {
      return {
        h5CoinList: {},
        IA_count: {},
        IA_sum: {},
        coinList: {},
        Machine: {},
        activeName: 'h5Coin',
        IALockStoreRewardLog: {},
        IAMemberExtend: {},
        order_money: {},
        Members: {},
        Works: {},
        Comment: {},
        Record: {}
      };
    },
    created() {
      this.handleClick({
        name: 'h5Coin'
      });
    },
    methods: {
      handleClick(t) {
        if (t.name == 'h5Coin') {
          this.getList(t.name).then(res => {
            this.h5CoinList = res.List;
            this.IA_count = res.IARechargeChainLog.count;
            this.IA_sum = res.IARechargeChainLog.sum;
            this.coinList = res.CoinList;
          });
        } else if (t.name == 'order') {
          this.getList(t.name).then(res => {
            this.IALockStoreRewardLog = res.IALockStoreRewardLog;
            this.IAMemberExtend = res.IAMemberExtend;
          });
        } else if (t.name == 'members') {
          this.getList(t.name).then(res => {
            this.Members = res;
            console.log(res);
          });
        } else if (t.name == 'work') {
          this.getList(t.name).then(res => {
            console.log(res);
            this.Works = res.works;
            this.Comment = res.comment;
            this.Record = res.record;
          });
        }
      },

      async getList(type) {
        let res = await statistics({
          type: type
        });
        return res.data;
      }
    }
  };
</script>
<style>
  .title {
    font-size: 25px;
    color: blue;
  }

  .content {
    margin-bottom: 20px;
    font-size: 18px;
  }

  .table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    float: left;
    table-layout: fixed;
  }

  .table td,
  .table th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
  }

  .table thead th {
    background-color: #CCE8EB;
    width: 100px;
  }

  .table tr:nth-child(odd) {
    background: #fff;
  }

  .table tr:nth-child(even) {
    background: #F5FAFA;
  }
</style>

<template>
  <div class="app-container">
    <table class="table" width="100%">
      <th>预约</th>
      <th>放行</th>
      <th>报单</th>
      <th>产出</th>
      <tr>
        <td>今日预约: {{ Statis.Today.Plan }}</td>
        <td>今日放行: {{ Statis.Today.Pass }}</td>
        <td>今日报单: {{ Statis.Today.Pay }}</td>
        <td>今日产出: {{ Statis.Today.Sum }}</td>
      </tr>
      <tr>
        <td>昨日预约: {{ Statis.Yesterday.Plan }}</td>
        <td>昨日放行: {{ Statis.Yesterday.Pass }}</td>
        <td>昨日报单: {{ Statis.Yesterday.Pay }}</td>
        <td>昨日产出: {{ Statis.Yesterday.Sum }}</td>
      </tr>
      <tr>
        <td>总预约: {{ Statis.All.Plan }}</td>
        <td>总放行: {{ Statis.All.Pass }}</td>
        <td>总报单: {{ Statis.All.Pay }}</td>
        <td>总产出: {{ Statis.All.Sum }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {
  statistics
} from '@/api/user.js'

export default {
  data() {
    return {
      Statis: {
        Today: {
          Plan: 0, Pass: 0, Pay: 0, Sum: 0
        },
        Yesterday: {
          Plan: 0, Pass: 0, Pay: 0, Sum: 0
        },
        All: {
          Plan: 0, Pass: 0, Pay: 0, Sum: 0
        }
      }
    }
  },
  created() {
    statistics({}).then(res => {
      this.Statis = res.data
    })
  },
  methods: {

  }
}
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

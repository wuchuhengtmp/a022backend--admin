<template>
  <div class="dashboard-editor-container">

    <panel-group :groups="temp.groups" @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

const lineChartData = {
  newVisitis: {
    expectedData: []
  }
}
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  computed: {
    ...mapGetters(['dashboard'])
  },
  created() {
    this.$store.dispatch('dashboard/getDahboard').then(resolve => {
      const temp = Object.assign({}, this.dashboard)
      this.temp = temp
      // this.lineChartData.newVisitis.expectedData = temp.prices
      this.lineChartData = { expectedData: temp.prices }
    })
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      temp: {
        groups: {
          certification_number_total: 0,
          number_total: 0,
          order_total: 0,
          transation_order_total: 0
        }
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>

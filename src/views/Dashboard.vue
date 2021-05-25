<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col md="6">
          <b-row>
            <b-col xl="4" md="12">
              <h2>Portfolio Value</h2>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="4" md="12">
              <stats-card title="In USD"
                          type="gradient-green"
                          :sub-title="portfolioValueInUsd"
                          icon="fas fa-dollar-sign"
                          class="mb-4">

                <!-- <template slot="footer">
                  <span class="text-success mr-2">3.48%</span>
                  <span class="text-nowrap">Since last month</span>
                </template> -->
              </stats-card>
            </b-col>
            <b-col xl="4" md="12">
              <stats-card title="In BTC"
                          type="gradient-orange"
                          :sub-title="portfolioValueInBtc"
                          icon="fab fa-btc"
                          class="mb-4">

                <!-- <template slot="footer">
                  <span class="text-success mr-2">12.18%</span>
                  <span class="text-nowrap">Since last month</span>
                </template> -->
              </stats-card>
            </b-col>
            <b-col xl="4" md="12">
              <stats-card title="In ETH"
                          type="gradient-blue"
                          :sub-title="portfolioValueInEth"
                          icon="fab fa-ethereum"
                          class="mb-4">

                <!-- <template slot="footer">
                  <span class="text-success mr-2">12.18%</span>
                  <span class="text-nowrap">Since last month</span>
                </template> -->
              </stats-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row>
            <b-col xl="4" md="12">
              <h2>Profit and Loss</h2>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="4" md="12">
              <stats-card title="Last 7 days"
                          type="gradient-pink"
                          sub-title="$924"
                          icon="fas fa-hand-holding-usd"
                          class="mb-4">

                <!-- <template slot="footer">
                  <span class="text-danger mr-2">5.72%</span>
                  <span class="text-nowrap">Since last month</span>
                </template> -->
              </stats-card>
            </b-col>
            <b-col xl="4" md="12">
              <stats-card title="Last 30 days"
                          type="gradient-red"
                          sub-title="$924"
                          icon="ni ni-money-coins"
                          class="mb-4">

                <!-- <template slot="footer">
                  <span class="text-danger mr-2">5.72%</span>
                  <span class="text-nowrap">Since last month</span>
                </template> -->
              </stats-card>

            </b-col>
            <b-col xl="4" md="12">
              <stats-card title="Overall"
                          type="gradient-info"
                          sub-title="$2985"
                          icon="ni ni-chart-bar-32"
                          class="mb-4">

                <!-- <template slot="footer">
                  <span class="text-success mr-2">54.8%</span>
                  <span class="text-nowrap">Since last month</span>
                </template> -->
              </stats-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                       class="mr-2 mr-md-0"
                       :active="bigLineChart.activeIndex === 0"
                       link-classes="py-2 px-3"
                       @click.prevent="initBigChart(0)">
                      <span class="d-none d-md-block">Month</span>
                      <span class="d-md-none">M</span>
                  </b-nav-item>
                  <b-nav-item
                    link-classes="py-2 px-3"
                    :active="bigLineChart.activeIndex === 1"
                    @click.prevent="initBigChart(1)"
                  >
                    <span class="d-none d-md-block">Week</span>
                    <span class="d-md-none">W</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </b-col>

        <b-col xl="4" class="mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </b-col>
            </b-row>

            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="redBarChart.chartData"
            >
            </bar-chart>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->

      <!--Tables-->
      <b-row class="mt-5">
        <b-col xl="12" class="mb-12 mb-xl-0">
          <page-visits-table :tableData=orderHistory></page-visits-table>
        </b-col>
      </b-row>
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  import ftx from '../endpoints/ftx'

  export default {
    components: {
      LineChart,
      BarChart,
      BaseProgress,
      StatsCard,
      PageVisitsTable,
      SocialTrafficTable
    },
    data() {
      return {
        orderHistory: [],
        portfolioValue: 0,
        ethPrice: 0,
        btcPrice: 0,
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Performance',
                data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
              }
            ],
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          extraOptions: chartConfigs.blueChartOptions
        }
      };
    },
    computed: {
      portfolioValueInUsd() {
        return (this.portfolioValue).toFixed(2)
      },
      portfolioValueInEth() {
        return (this.portfolioValue / this.ethPrice).toFixed(4)
      },
      portfolioValueInBtc() {
        return (this.portfolioValue / this.btcPrice).toFixed(4)
      },
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    created() {
      this.initBigChart(0)
      ftx.getAccountInformation().then((result) => {
        console.log('getAccountInformation', result)
        this.portfolioValue = result.totalAccountValue
        this.positions = result.positions
      })
      ftx.getMarketPrice('BTC/USD').then((result) => {
        this.btcPrice = result.last
      })
      ftx.getMarketPrice('ETH/USD').then((result) => {
        this.ethPrice = result.last
      })
      ftx.getOrdersHistory().then((result) => {
        console.log('getOrdersHistory', result)
        this.orderHistory = result;
      })
      ftx.getOrderStatus('44328121254').then((result) => {
        console.log('getOrderStatus 44328121254', result)
      })

      // ftx.getOptionsPosition().then((result) => {
      //   console.log('getOptionsPosition', result)
      // })
      // ftx.getLimitOrdersHistory().then((result) => {
      //   console.log('getLimitOrdersHistory', result)
      // })
      ftx.getBalances().then((result) => {
        console.log('getBalances', result)
      })
    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>

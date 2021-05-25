<template>

  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col class="text-left">
          <a href="#!" class="btn btn-sm btn-primary">All orders</a>
          <a href="#!" class="btn btn-sm btn-secondary">Open orders</a>
          <a href="#!" class="btn btn-sm btn-secondary">Completed orders</a>
          <a href="#!" class="btn btn-sm btn-secondary">Canceled orders</a>
        </b-col>
      </b-row>
    </template>

    <el-table class="table-responsive table"
              :data="tableData"
              header-row-class-name="thead-light">
      <el-table-column label="#"
                       min-width="90px"
                       prop="id">
      </el-table-column>
      <el-table-column label="Pair"
                       min-width="90px"
                       prop="market">
      </el-table-column>
      <el-table-column label="Side"
                       min-width="90px"
                       prop="side">
      </el-table-column>
      <el-table-column label="Price"
                       min-width="90px"
                       prop="avgFillPrice">
        <template v-slot="{row}">
          <div class="font-weight-600">{{row.avgFillPrice}}</div>
        </template>
      </el-table-column>
      <el-table-column label="Take Profit"
                       min-width="120px"
                       prop="takeProfit">
        <template v-slot="{row}">
          <div class="font-weight-600">{{row.takeProfit}}</div>
        </template>
      </el-table-column>
      <el-table-column label="Stop Loss"
                       min-width="110px"
                       prop="stopLoss">
        <template v-slot="{row}">
          <div class="font-weight-600">{{row.stopLoss}}</div>
        </template>
      </el-table-column>
      <el-table-column label="Portfolio (%)"
                       min-width="140px"
                       prop="portfolioPercentage">
        <template v-slot="{row}">
          {{row.portfolioPercentage}}
        </template>
      </el-table-column>
      <el-table-column label="AVG P/L"
                       min-width="110px"
                       prop="realizedPnl">
        <template v-slot="{row}">
          {{row.avgProfitLoss}}
        </template>
      </el-table-column>
      <el-table-column label="Weighted P/L"
                       min-width="140px"
                       prop="weightedProfitLoss">
        <template v-slot="{row}">
          {{row.weightedProfitLoss}}
        </template>
      </el-table-column>
      <el-table-column label="R/R"
                       min-width="90px"
                       prop="rr">
      </el-table-column>
      <el-table-column label="Status"
                       min-width="130px"
                       prop="status">
      </el-table-column>
      <el-table-column label="Timestamp"
                       min-width="120px"
                       prop="createdAt">
      </el-table-column>
    </el-table>
  </b-card>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  import ftx from '../../endpoints/ftx'

  export default {
    name: 'page-visits-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    props: {
      tableData: Array
    },
    data() {
      return {
      }
    },
    created() {
      console.log('props', this.props)
      ftx.getMarketPrice('STEP-PERP').then((result) => {
        console.log(result)
      })
    }
  }
</script>
<style>
</style>

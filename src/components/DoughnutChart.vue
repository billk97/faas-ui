<script>
    import { Doughnut } from 'vue-chartjs'
    export default {
        extends: Doughnut,
        props: {
            chartdata: {
                type: Array,
                required: true
            },
            chartdataLabels: {
                type: Array,
                required: true
            },
            rgbColors: {
                type: Array,
                default: null
            }
        },
        data() {
            return {
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            color: '#fff',
                            font: {
                                size: 15
                            }
                        }
                    }
                },
                backgroundColors: [
                    'rgb(23, 107, 160)',
                    '#9e9e9e',
                    '#003f5c',
                    '#58508d',
                    '#bc5090',
                    '#ff6361',
                    '#ff7c43',
                    '#ffa600',
                    'rgb(235, 84, 140)',
                    'rgb(219, 76, 178)',
                    'rgb(175, 75, 206)',
                    'rgb(125, 58, 193)',
                    'rgb(192, 35, 35)',
                    'rgb(222, 84, 44)',
                    'rgb(239, 126, 50)',
                    'rgb(238, 154, 58)',
                    'rgb(234, 189, 56)'
                ]
            }
        },
        computed: {
            data() {
                return this.chartdata
            }
        },
        watch: {
            chartdata() {
                this.renderPieChart()
            }
        },
        mounted() {
            this.renderPieChart()
        },
        methods: {
            renderPieChart() {
                const tempChart = {}
                tempChart.labels = this.chartdataLabels
                tempChart.datasets = []
                const temp = {
                    data: this.chartdata.map(obj => obj.value),
                    backgroundColor: this.getColors()
                }
                tempChart.datasets.push(temp)
                this.renderChart(tempChart, this.options)
            },
            getColors() {
                if (this.rgbColors) {
                    return this.rgbColors
                }
                return this.backgroundColors
            }
        }
    }
</script>

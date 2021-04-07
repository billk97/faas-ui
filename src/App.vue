<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <img alt="kubernetis" src="https://www.logo.wine/a/logo/Kubernetes/Kubernetes-Logo.wine.svg" height="250px">
        <img alt="openfa" src="https://blog.alexellis.io/content/images/2017/08/faas_side.png">
        <hello-world msg="Team 3 open faas project" />
        <b-button variant="info" class="mr-5" @click="changeSelectedOne()">First</b-button>
        <b-button variant="info" @click="changeSelectedTwo()">Second</b-button>
        <b-card
            border-variant="secondary"
            header="First question"
            header-bg-variant="secondary"
            header-text-variant="white"
            align="center"
            class="mx-5 mt-3"
        >
            <div v-if="selectOne">
                <div>
                    <b-button variant="success" class="mr-5" @click="start()">Start</b-button>
                    <b-button variant="danger" @click="stop()">Stop</b-button>
                </div>
                <doughnut-chart :chartdata="getLastValue()" :chartdata-labels="['north_east', 'north_west','south_east','south_west']" />
                <b-table striped hover :items="resp" />
            </div>
        </b-card>
        <b-card
            border-variant="secondary"
            header="Second question"
            header-bg-variant="secondary"
            header-text-variant="white"
            align="center"
            class="mx-5 mt-3"
        >
            <div v-if="selectTwo">
                <div class="mb-3">
                    <b-button variant="success" class="mr-5" @click="startMap()">Start</b-button>
                    <b-button variant="danger" @click="stopMap">Stop</b-button>
                </div>
                <gmap-map
                    :center="center"
                    :zoom="12"
                    class="mx-5"
                    style="width: 90%;  height: 800px;"
                >
                    <gmap-marker
                        v-for="(m, index) in markers"
                        :key="index"
                        ref="gmark"
                        :position="m"
                        @click="center=m"
                    />
                </gmap-map>
            </div>
        </b-card>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import DoughnutChart from '@/components/DoughnutChart.vue'
    import axios from 'axios'

    export default {
        name: 'App',
        components: {
            HelloWorld,
            DoughnutChart
        },
        data() {
            return {
                resp: [],
                inter: null,
                mapInter: null,
                center: { lat: 40.76739076842072, lng: -73.98199356965752 },
                markers: [{
                    lat: 40.76739076842072,
                    lng: -73.98199356965752,
                    label: 'Surat'
                }],
                currentPlace: null,
                intermediate: null,
                selectOne: true,
                selectTwo: false
            }
        },
        methods: {
            start(){
                this.geolocate()
                this.inter = setInterval(() => {
                    axios.post('http://localhost:8080/function/redis-api', {key: "routes"}).then(resp => {
                        this.resp.push(resp.data)
                        if (this.resp.length < 1) {
                            return
                        }
                        const previous = this.resp[this.resp.length - 2]
                        const current = this.resp[this.resp.length - 1]
                        if (previous.north_east === current.north_east && previous.north_west === current.north_west &&
                            previous.south_east === current.south_east && previous.south_west === current.south_west) {
                            this.resp.pop()
                        }
                    })
                }, 2000)

            },
            stop() {
                clearInterval(this.inter)
            },
            startMap() {
                this.mapInter = setInterval(() => {
                    axios.post('http://localhost:8080/function/redis-api', {key: "intermediate"}).then(resp => {
                        for (const r of resp.data) {
                            console.log(r)
                            let v = { lat: r.drop_off_latitude, lng: r.drop_off_longitude, label: 'New jork' }
                            this.markers.push(v)
                        }
                    })
                })
            },
            stopMap() {
                clearInterval(this.mapInter)
            },
            changeSelectedOne(){
                this.selectOne = !this.selectOne
            },
            changeSelectedTwo(){
                this.selectTwo = !this.selectTwo
            },
            getLastValue() {
                if ([this.resp.length] < 1 ){
                    return [{value: 1 }, {value: 1}, {value: 1}, {value: 1}]
                }
                const c = this.resp[this.resp.length - 1]
                return [{value: c.north_east}, {value: c.north_west}, {value: c.south_east}, {value: c.south_west}]
            },
            getCounts() {
                if ([this.resp.length] < 1 ){
                    return [{value: 1 }, {value: 1}, {value: 1}, {value: 1}]
                }
            },
            geolocate() {
            }
        }
    }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

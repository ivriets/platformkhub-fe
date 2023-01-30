<template>
    <div>
        <div>
            <ElementsTab 
                :listTab="listTab"
                v-model="selectedTab"
                :selectedTab="selectedTab"
                :landing="'spa'"
            />
        </div>
        <div class="main-area">
            <DashboardFeaturedContentItem 
                :selectedTab="selectedTab"
                :key="'ketab'+keyTab"
            />
        </div>

    </div>
</template>


<script>
// import featuredContent from '~/static/data/featuredcontent.json';

export default {
    data() {
        return {
            selectedTab: 'program',
            keyTab: 0,
            listTab: [
                {
                    id: 'program',
                    label: 'Program'
                },
                {
                    id: 'event',
                    label: 'Event'
                },
                {
                    id: 'resources',
                    label:'Resources'
                },
                {
                    id: 'blog',
                    label: 'Blog'
                },
                {
                    id: 'outlook',
                    label: 'Outlook'
                }
            ],

            filter: {
                searchProgram: '',
                searchEvent: '',
                searchResource: '',
                searchBlog: '',
            },


        }
    },
    computed: {
        lang() {
            return this.$i18n.locale
        },
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },
        basePath() {
            return process.env.BASE_URL
        }
    },
    watch: {
        selectedTab() {
            this.keyTab +=1
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
        },

        async masterPoint() {
            this.dataTable = []
            await this.$apiBase.get('featuredcontent//').then(res => {
                var featuredContent = res.data
                this.featuredProgram = featuredContent.featuredProgram
                this.featuredEvent = featuredContent.featuredEvent
                this.featuredResource = featuredContent.featuredResource
                this.featuredBlog = featuredContent.featuredBlog
            }).catch(err => {
                console.log(err)
            })
        },

        async updateData(data) {           
            await this.$apiBase.put('featuredcontent/', data).then(res => {
                const data = res.data         
                this.message = data.message
                alert("Data berhasil disimpan.")
                this.masterPoint()
            }).catch(err => {
                console.log(err)
            })
        }, 
        updateFeatureContent () {
            var dataUpdate = {
                featuredProgram: this.featuredProgram,
                featuredEvent: this.featuredEvent,
                featuredResource: this.featuredResource,
                featuredBlog: this.featuredBlog
            }
            this.updateData(dataUpdate)
        },
       
    },
}
</script>
<template>
    <div class="bg-black w-full text-center flex justify-center items-center overflow-hidden">

    <iframe v-if="provider && provider==='youtube'" width="640" height="360" allow='autoplay' allowfullscreen
        :src="src3+'?autoplay=1&origin=https://khub.id&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'">
    </iframe>

    <ElementsVideoPlayer v-else :options="videoOptions" />
</div>
</template>
<script>
export default {
    props: ['path', 'provider'],
    data() {
        return {
            src1: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
            src2: 'https://youtube.com/watch?v=X_wsPb99HLA',
            src3: 'https://www.youtube-nocookie.com/embed/X_wsPb99HLA',

        }
    },
    computed: {
        videoOptions() {
            const def = {
                autoplay: true,
                controls: true,
                width: '640',
                sources: [
                    {
                        src: 'https://www.youtube-nocookie.com/embed/' + this.path,
                        // type: 'video/mp4'
                    }
                ]
            }
            return def;
        }
    },

    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {
            // const player = new Plyr('#player',{})
            // player.play()
        }
    }
}
</script>

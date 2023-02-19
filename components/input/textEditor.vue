<template>
    <div class="text-editor-area">
        <editor 
            :api-key="apiKey"
            :id="name"
            :init="init"
            model-events="change keydown blur focus paste"
            @keydown="onKeyDown"
            @selectionChange="handlerFunction"
            v-model="model"
        />
        <div v-if="counter && counter === true && max && parseInt(max) > 0" class="text-xs text-warna-dua mt-1 ml-1">{{value.length}}/{{max}} {{ $t('(html tag included)') }}</div>

    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import "tinymce/skins/ui/oxide/skin.min.css"
// import "tinymce/skins/ui/oxide/content.min.css"
import "tinymce/skins/ui/oxide/skin.min.css"
// import "~/static/skins/khub/content.min.css"
// import "tinymce/skins/ui/oxide/content.min.css"

// import "tinymce/skins/content/default/content.css"
// import "tinymce/skins/ui/oxide/skin.min.css"
// import "tinymce/skins/ui/oxide/content.min.css"
// import "tinymce/skins/ui/oxide/skin.min.css"
// import "tinymce/skins/ui/oxide/content.min.css"


export default {
    props: ['name','value', 'max', 'counter'],
   components: {
     'editor': Editor
   },

    data() {
        return {
            newVal: '',
            apiKey: '4mmlxe34rf97oethnvrllz6wz0v78ef36t3uj5u7gzsx84ne',
            init: {
                skin:false,
                content_css: false,
                statusbar: false,
                height: 400,
                menubar: false,
                plugins: ['advlist','autolink', 'lists','link', 'image', 'charmap', 'preview', 'code', 'table', 'codesample', 'fullscreen'],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor table codesample  | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                codesample_languages: [
                    {text: 'JSON', value: 'json'},
                    {text: 'JavaScript', value: 'javascript'},
                ],
                content_style: 'pre {background:rgba(0,0,0,.5);display:block; padding:10px;color:#ffffff;}'
            }
        }
    },



    computed: {
        model: {
            get() {
                return this.value ? this.value : ''
            },
            set(value) {
                this.$emit('input', value)
            }
        },
    },
    watch: {
        model(val) {
            // console.log(val.length)
        }
    },
    methods: {
        onKeyDown(event) {
            console.log(event);
            event.preventDefault();
        },
        handlerFunction(event, editor) {
            console.log(event)
            console.log(editor)
        }
    }

}
</script>
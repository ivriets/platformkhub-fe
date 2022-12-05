<template>
    <div class="text-editor-area">
        <editor 
            :api-key="apiKey"
            :id="name"
            :init="init"
            v-model="model"
        />
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
export default {
    props: ['name','value'],
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
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
    },

}
</script>
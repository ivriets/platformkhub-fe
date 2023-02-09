<template>
    <div class="h-[calc(100vh-200px)] p-20">
        <div class="container mx-auto">
            <h1 class="font-mono text-utama z-50 text-3xl text-center font-bold">
            {{ error.statusCode }} - Ooops... are you lost?
          </h1>
        <img src="/images/error.png" class="w-1/2 h-auto mx-auto" alt="error" />
        </div>
      
    </div>
  </template>
  
  <script>
  export default {
    props: ['error'],
    layout: 'error', // you can set a custom layout for the error page
  }
  </script>
  
<template>
    <div class="h-[calc(100vh-200px)] p-20">
        <div class="container mx-auto">
            <h1 class="font-mono text-utama z-50 text-3xl text-center font-bold">
            {{ error.statusCode }} - Ooops... are you lost?
          </h1>
        <img src="/images/error.png" class="w-1/2 h-auto mx-auto" alt="error" />
        </div>


      <!-- <div
        id="sky"
        class="fixed z-50 top-0 h-screen w-screen flex justify-center items-center"
      >
        <div
          class="hidden flex-col items-center justify-center bg-gray-900 text-white w-screen h-screen md:flex"
        >
          <div id="stars" class="self-start z-30"></div>
          <div id="stars2" class="self-start z-40"></div>
          <div id="stars3" class="self-start z-20"></div>
          <h1 class="font-mono text-white z-50 text-6xl">
            {{ error.statusCode }} - Ooops... are you lost?
          </h1>
          <nuxt-link
            to="/"
            class="space cursor-pointer z-50 flex-col justify-center items-center flex pt-4 px-8 rounded-md text-purple-800 transform duration-150 ease-in hover:text-white hover:scale-105"
          >
          </nuxt-link>
        </div>
      </div> -->
      
    </div>
  </template>
  
  <script>
  export default {
    props: ['error'],
    layout: 'error', // you can set a custom layout for the error page
  }
  </script>
  
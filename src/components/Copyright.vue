<template lang="pug">
    div.copyright
        p
            small © 2017 Guibin. All rights reserved. 
            a(href='http://www.guibinspace.com', target='_blank') http://www.guibinspace.com
</template>

<style lang="less">
.copyright {
  margin: 0;
  position: fixed;
  bottom: 0.5em;
  right: 1em;
  color: #fff;
  z-index: 8;

  a {
      color: #ffffff;
      text-decoration-line: none;
      :visited {
          color: #ffffff;
      }
  }
}
</style>

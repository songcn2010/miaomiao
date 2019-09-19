<template>
  <div class="messageBox">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <div class="btn">
      <div v-if="cancel" @touchstart="handleCancel">{{ cancel }}</div>
      <div c-if="ok" @touchstart="handleOk">{{ ok }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messageBox'
}
</script>

<style>
  .messageBox{
    width: 200px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 3px 2px 5px 3px #aaa;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
  .messageBox h2 {
    text-align: center;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.6);
  }
  .messageBox p {
    text-align: center;
    line-height: 30px;
    color: rgba(0, 0, 0);
  }
  .messageBox .btn {
    display: flex;
    width: 100%;
  }
  .messageBox .btn>div {
    flex: 1;
    text-align: center;
    border: 1px solid #aaa;
    margin: 10px;
    padding: 5px;
    border-radius: 15px;
  }
</style>

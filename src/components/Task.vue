<template>
  <div>My component</div>
</template>

<script>
export default {
  name: 'Task',
  props: [Task]
  data () {
    return {
      taskID: '',
      name: '',
      description: '',
      format: '',
      owner: 'foo',
      user: '',
    }
  }
}
</script>

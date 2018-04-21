import * as dynamoose from 'dynamoose'

dynamoose.setDefaults({
  create: false,
  prefix: '',
  suffix: ''
})

export default dynamoose

var Mock = require("mockjs");
const Random =  Mock.Random

const pageList = []

for (let i = 1; i < 200; i++) {
  //生成随机项
  let name = Random.cname();
  let age = Mock.mock({ "age|1-100": 100 }).age;
  let home = Random.province();
  let sex = Random.pick(["男", "女"]);
  let education = Random.pick(["初中", "高中", "专科", "本科"]);

  pageList.push({ id: i, name, age, home, sex, education });
}

// 分页接口
Mock.mock('http://localhost:8080/list', 'post', (params) => {
    const info = JSON.parse(params.body)
    const [index, size, total] = [info.pageIndex, info.pageSize, pageList.length]
    const len = total / size
    const totalPages = len - parseInt(len) > 0 ? parseInt(len) : len
    const curPageList = pageList.slice((index - 1) * size, (index) * size)
    return {
        'code': '0',
        'message': 'success',
        'data': {
            'pageIndex': index,
            'pageSize': size,
            'rows': curPageList,
            'total': total,
            'totalPages': totalPages,
            'student': curPageList
        }
    }
})

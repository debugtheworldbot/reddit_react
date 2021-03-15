import {MikroORM} from '@mikro-orm/core'
import {__prod__} from './constants'
import {Post} from './entities/Post'

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: 'reddit',
    type: 'postgresql',
    debug: !__prod__
    
  })

  const post = orm.em.create(Post, {title: 'the first post'})
  await orm.em.persistAndFlush(post)

  await orm.em.nativeInsert(Post, {title: 'another post'})
}

main().catch(err => {
  console.error(err)
})

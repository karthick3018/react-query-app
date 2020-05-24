import { useInfiniteQuery } from 'react-query';

function Projects() {
  const fetchProjects = (key, cursor = 0) =>
    fetch('https://jsonplaceholder.typicode.com/posts')

  const {
    status,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery('listData', fetchProjects, {
    getFetchMore: (lastGroup, allGroups) => lastGroup.nextCursor,
  })


   return {
     status,
     data:data.data,
     isFetching,
     isFetchingMore,
     fetchMore,
     canFetchMore
   }
}

export default  Projects


export default function Post({ postData }) {
  return <div>起飞</div>
}

const paths = [
  {
    params: {
      id: '123',
      name: 'Jeremy',
    },
  },
  {
    params: {
      id: '456',
      name: 'Jeremy 第二篇',
    },
  },
]

export async function getStaticProps({ params }) {
  console.log(params.id)
  return {
    props: {
      postData: { name: 123 },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths,
    fallback: false,
  }
}

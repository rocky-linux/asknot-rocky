declare module "*.yml" {
  interface Node {
    id: string
    title: string
    question?: string
    options?: Node[]
    link?: string
  }

  const content: {
    tree: Node
  }
  export default content
} 
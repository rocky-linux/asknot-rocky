declare module "*.yml" {
  interface Node {
    id: string
    titleKey: string
    subtitleKey?: string
    options?: Node[]
    link?: string
  }

  const content: {
    tree: {
      segueKey1: string
      segueKey2: string
      options: Node[]
    }
  }
  export default content
} 
import { Box, Typography } from "@mui/material"
import { FileRow } from "./components/FileRow"
import { useWorkspaceContext } from "@/components/Workspace/WorkspaceContext"

export const FilePane = () => {
  const { files } = useWorkspaceContext()

  const paths: Array<Array<string>> = files.map((file: any) =>
    file.path.split("/")
  )

  // console.log(paths)

  // traverse each filepath
  // const dirs = ["app", "src", "App.tsx"]

  // becomes ->

  // const tree = {
  // app: {
  // src:{files[]}
  // data:{files[]}
  // files:[]
  // }
  // }

  let tree: any = {}

  for (let i = 0; i < paths.length; i++) {
    let cur = tree

    let array = paths[i]
    let fileName = array.pop()

    array.map((string) => {
      if (cur[string]) {
        cur = cur[string]
      } else {
        cur[string] = { files: [] }
        cur = cur[string]
      }
    })

    cur.files.push(fileName)
  }

  // console.log("tree", tree)

  return (
    <Box>
      <Box p={1}>
        <Typography variant="h6">Files</Typography>
      </Box>
      <Box>
        {files.map((file) => (
          <FileRow key={file.path} file={file} />
        ))}
      </Box>
    </Box>
  )
}

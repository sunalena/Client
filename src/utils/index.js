export const mutateProp = name => ({
  props: ({ mutate }) => ({
    [name]: variables =>
      mutate({
        variables
      })
  })
})

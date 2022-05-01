import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import clase9modulescss from 'dist/css/clase9.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addSuscriptores, editSuscriptores, loadSuscriptores, removeSuscriptor, searchSuscriptores } from '../store/actions/suscriptoresActions'
import { ISuscriptoresItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Suscriptores: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataSuscriptores = {
    Email: '',
  }
  const [Suscriptoresdata, setSuscriptoresData] = React.useState<any>(initialDataSuscriptores)
  const handleSuscriptoresChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setSuscriptoresData({
      ...Suscriptoresdata,
      [name]: value,
    })
  }
  const suscriptoresData = useSelector((state: IState) => state.suscriptores)
  const theme = clase9modulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForSuscriptores = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchSuscriptores(options) : loadSuscriptores(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogSuscriptoresAction, setdialogSuscriptoresAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchSuscriptores(options) : loadSuscriptores(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.pages}>
          <div title="div" className={theme.mainarea}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Suscriptor list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Suscriptor..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForSuscriptores}
                    />

                    <LocalAddDialog
                      isOpen={dialogSuscriptoresAction !== ''}
                      onOpen={() => setdialogSuscriptoresAction('add')}
                      onSave={() => setdialogSuscriptoresAction('')}
                      onClose={() => setdialogSuscriptoresAction('')}
                      action={dialogSuscriptoresAction}
                      addOptions={{ title: 'Add Suscriptor', text: 'Enter Suscriptor data', button: 'Add' }}
                      editOptions={{ title: 'Edit Suscriptor', text: 'Update Suscriptor data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: ISuscriptoresItem) => {
                        if (dialogSuscriptoresAction === 'delete') {
                          dispatch(removeSuscriptor(data))
                        } else {
                          dialogSuscriptoresAction === 'add' ? dispatch(addSuscriptores(data)) : dispatch(editSuscriptores(data))
                        }
                      }}
                      color="primary"
                      data={Suscriptoresdata}
                      initialData={initialDataSuscriptores}
                      setData={setSuscriptoresData}
                      allowMultipleSubmit={dialogSuscriptoresAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Email"
                        type="text"
                        fullWidth
                        className={'field_Email'}
                        variant="standard"
                        value={Suscriptoresdata.Email || ''}
                        onChange={handleSuscriptoresChange('Email')}
                        error={suscriptoresData?.errField === 'Email'}
                        helperText={suscriptoresData?.errField === 'Email' && suscriptoresData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Email', 'Actions']}
                      tableData={
                        suscriptoresData.foundsuscriptores.length ? suscriptoresData.foundsuscriptores : (suscriptoresData.suscriptores as any)
                      }
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.Email} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setSuscriptoresData(e.element)
                            setdialogSuscriptoresAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeSuscriptor(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Suscriptores

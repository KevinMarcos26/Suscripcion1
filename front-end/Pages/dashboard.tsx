import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import clase9modulescss from 'dist/css/clase9.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSuscriptores, editSuscriptores, loadSuscriptores, searchSuscriptores } from '../store/actions/suscriptoresActions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const Dashboard: FunctionComponent = (props: any) => {
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
  const theme = clase9modulescss
  const sus = useSelector((state: IState) => state.suscriptores).suscriptores
  const suscriptoresData = useSelector((state: IState) => state.suscriptores)
  const dispatch = useDispatch()
  const [LoadSuscriptoresfromDatabaseloadoptions, setLoadSuscriptoresfromDatabaseloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 1,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadSuscriptoresfromDatabaseload = (options) => {
    dispatch(options.searchString ? searchSuscriptores(options) : loadSuscriptores(options))
  }
  React.useEffect(() => {
    performLoadSuscriptoresfromDatabaseload({
      ...LoadSuscriptoresfromDatabaseloadoptions,
    })
  }, [LoadSuscriptoresfromDatabaseloadoptions])
  const [openSnackbar, setopenSnackbar] = React.useState(false)

  // Theme selection

  const suscribe = () => {
    let data = { ...Suscriptoresdata }
    setSuscriptoresData({ ...initialDataSuscriptores })

    if (data._id) {
      dispatch(editSuscriptores(data as any))
    } else {
      dispatch(addSuscriptores(data as any))
    }
  }

  return (
    <React.Fragment>
      <div className={clsx(theme.pages, theme.suscripcion)}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => {
            setopenSnackbar(false)
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="success">
            <AlertTitle>Enviado!</AlertTitle>
          </Alert>
        </Snackbar>
        <div title="Info" className={theme.suscripcionInfo}>
          <div title="Info Wrapper">
            <Typography variant="h1">Conoce mis proyectos</Typography>

            <Typography variant="body1">
              Soy desarrollador web full stack y analista de datos en Microsoft Power Bi. Soy de Córdoba, Argentina, tengo 25 años y te invito a que
              me conozcas mejor y veas mis proyectos y desarrollos.
            </Typography>

            <div title="Field Wrapper" className={theme.suscripcionField}>
              <TextField
                margin="normal"
                label="Email"
                type="text"
                fullWidth
                className={theme}
                variant="filled"
                value={Suscriptoresdata.Email || ''}
                onChange={handleSuscriptoresChange('Email')}
                error={suscriptoresData?.errField === 'Email'}
                helperText={suscriptoresData?.errField === 'Email' && suscriptoresData.errMessage}
              />

              <Button
                variant="contained"
                onClickCapture={(e) => {
                  suscribe()
                  setopenSnackbar(true)
                }}
              >
                Escribime!
              </Button>
            </div>

            <div title="Socials" className={theme.socials}>
              <picture>
              <a href="https://www.facebook.com/kevinmarcos.aguimanera"><img src="/img/facebookLogoWhite.svg" alt="/img/facebookLogoWhite.svg" width="30" height="30" />
               </a>
                </picture>

              <picture>
              <a href="https://www.instagram.com/kevin_manera96/"><img src="/img/instagramLogoWhite.svg" alt="/img/instagramLogoWhite.svg" width="30" height="30" />
                </a>
                 
          </picture>

              <picture>
              <a href="https://www.linkedin.com/in/kevin-marcos-agui-manera-392aa9170/"><img src="/img/linkedinLogoWhite.svg" alt="/img/linkedinLogoWhite.svg" width="30" height="30" />
                </a>
                 
               </picture>

              <picture>
              <a href="https://github.com/KevinMarcos26"><img src="/img/101-1017465_github-github-icon-png-grey.png"
                  alt="/img/101-1017465_github-github-icon-png-grey.pngs" width="30" height="30" /></a>
               
          
              </picture>

             

            </div>
          </div>
        </div>

        <picture>
            <img src="/img/programacion-730x400.jpg" alt="/img/programacion-730x400.jpg" width="720" height="657" />
          </picture>

        
        
        
      </div>
    </React.Fragment>
  )
}

export default Dashboard

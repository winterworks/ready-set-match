import React, { useState } from 'react'
import { useAtom } from 'jotai'
import { stateAtom } from 'src/data/state'
import { Button, Grid, TextareaAutosize, Typography } from '@mui/material'
import { Data } from 'src/types'
import { persistFullState } from 'src/data/dbConnector'
import { HeaderMenu } from 'src/components/headerMenu'
import ConfirmAction from 'src/components/confirmAction'

export default function DataDetail() {
  const [state, setState] = useAtom(stateAtom)
  const [dataImportValue, setDataImportValue] = useState<string>()

  const onCopy = () => {
    const type = 'text/plain'
    const blob = new Blob([JSON.stringify(state)], { type })
    const data = [new ClipboardItem({ [type]: blob })]
    void navigator.clipboard.write(data)
  }

  const onLoad = () => {
    if (!dataImportValue) {
      return
    }
    const newData = JSON.parse(dataImportValue) as Data
    setState(newData)
    persistFullState(newData)
  }

  const onDataInputFieldChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataImportValue(e.target.value)
  }

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={4}
    >
      <HeaderMenu />
      <Grid item xs={12}>
        <Typography component="h3" variant="h5" gutterBottom>
          Export
        </Typography>
        <TextareaAutosize
          id="data-export"
          aria-label="Current saved data"
          minRows={3}
          maxRows={15}
          placeholder="Current saved data"
          disabled
          value={JSON.stringify(state)}
          style={{ width: '100%', resize: 'vertical' }}
        />
        <Button variant="contained" onClick={onCopy}>
          Copy
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h3" variant="h5" gutterBottom>
          Import
        </Typography>
        <TextareaAutosize
          id="data-import"
          aria-label="Paste your data here"
          minRows={3}
          maxRows={15}
          placeholder="Paste your data here"
          style={{ width: '100%', resize: 'vertical' }}
          value={dataImportValue}
          onChange={onDataInputFieldChanged}
        />
        <ConfirmAction
          onConfirm={onLoad}
          title="Load new data"
          message="Are you sure you want import this new data? All existing data will be overwritten!"
          buttonText="Import"
          buttonProps={{
            variant: 'contained',
          }}
          cancelText="cancel"
          confirmText="Import"
        />
      </Grid>
    </Grid>
  )
}

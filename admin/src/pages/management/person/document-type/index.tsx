import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import FormPanel from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateDocumentType,
  useDeleteDocumentType,
  useEditDocumentType,
} from '@/features/document-type'
import { useApp } from '@/hooks/use-app'
import { PersonDocument } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonDocument[]>([])
  const formEdit = useRef<any>(null)

  const { mutate: createDocumentType } = useCreateDocumentType()
  const { mutate: editDocumentType } = useEditDocumentType()
  const { mutate: deleteDocumentTypes } = useDeleteDocumentType()
  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()

  const { t: documentTypesT } = useTranslation('document-types')
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
    },
    mode: 'onChange',
  })

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
    })

    const id = openDialog({
      title: documentTypesT('create'),
      description: documentTypesT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: documentTypesT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data: PersonDocument) => {
            createDocumentType({
              id: Number(data.id),
              name: data.value,
            })
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: PersonDocument[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: PersonDocument) => (
            <div key={item.value} className='mb-5'>
              <h3 className='text-md font-semibold'>
                {item.id} - {item.value}
              </h3>
            </div>
          ))}
        </div>
      ),
      title: documentTypesT('delete'),
      description: documentTypesT('deleteText'),
      buttons: [
        {
          text: actionsT('cancel'),
          variant: 'secondary',
          onClick: () => {
            setSelectedItems(items)
            closeDialog(id)
          },
        },
        {
          text: actionsT('delete'),
          variant: 'destructive',
          onClick: () => {
            deleteDocumentTypes(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: PersonDocument) => {
    form.reset({
      id: item.id || '',
      name: item.value || '',
    })

    const id = openSheet({
      children: () => (
        <TabPanel
          activeTabIndex={0}
          tabs={[
            {
              title: actionsT('details'),
              buttons: [
                {
                  text: actionsT('save'),
                  variant: 'default',
                  onClick: () => {
                    formEdit.current?.submit()
                  },
                },
              ],
              children: (
                <FormPanel
                  ref={formEdit}
                  fields={[
                    {
                      name: 'name',
                      label: { text: documentTypesT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: PersonDocument) => {
                    editDocumentType({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
          ]}
        />
      ),
      title: documentTypesT('edit'),
      description: documentTypesT('editText'),
    })

    return id
  }

  return (
    <>
      <PageTitle title={modulesT('documentTypes')} />

      <DataPanel
        url='/person-document-type'
        layout='table'
        id='document-types'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: documentTypesT('name') },
        ]}
        selected={selectedItems as PersonDocument[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: documentTypesT('editTooltip'),
            handler: (items: PersonDocument[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            tooltip: documentTypesT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: documentTypesT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}

import { useSelector } from 'react-redux';
import { Contact } from 'components/Contact/Contact';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { useMemo, useEffect } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import toast from 'react-hot-toast';

export const ContactList = () => {
  const filter = useSelector(state => state.filter);

  const { data: contacts, error, isLoading } = useGetContactsQuery();

  const renderList = useMemo(
    () =>
      contacts?.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ) ?? [],
    [contacts, filter]
  );
  useEffect(() => {
    if (error) {
      toast.error(
        `We couldn'n get your contacts. Try again later. Error code: ${error.status}`
      );
    }
    return;
  }, [error]);

  return (
    <>
      {isLoading && <Spinner />}
      {renderList.length > 0 && (
        <ul>
          {renderList?.map(contact => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </>
  );
};

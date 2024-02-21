import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactRec,
  getContactDetais,
  getContactsList,
} from "../../../redux/services/contact";
import Loader from "../../../components/Loader/Loader";
import {
  FaArchive,
  FaArrowDown,
  FaCopy,
  FaEdit,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";

const ContactList = ({ contactsData, onToggleEdit, isEdit }) => {
  const dispatch = useDispatch();
  // const [contactsData, setContactData] = useState();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, contacts } = useSelector((state) => state.contact);
  useEffect(() => {
    if (token) {
      dispatch(getContactsList(token));
    }
  }, [dispatch, token]);
  // useEffect(() => {
  //   if (contacts.length > 0) {
  //     setContactData(contacts);
  //   }
  // }, [contacts]);
  const handleDeleteContact = (contact_id) => {
    console.log("🚀 ~ handleDeleteContact ~ contact_id:", contact_id);
    dispatch(deleteContactRec(token, contact_id));
    onToggleEdit(false);
  };
  const handleToggle = (contact_id) => {
    onToggleEdit(true);
    dispatch(getContactDetais(token, contact_id));
  };
  return (
    <div className="contact-list-view">
      {!isEdit && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <table id="datable_1" className="table nowrap w-100 mb-5">
              <thead>
                <tr>
                  <th>
                    <span className="form-check mb-0">
                      <input
                        type="checkbox"
                        className="form-check-input check-select-all"
                        id="customCheck1"
                      />
                      <label
                        className="form-check-label"
                        for="customCheck1"
                      ></label>
                    </span>
                  </th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Tags</th>
                  <th>Labels</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contactsData?.length > 0 &&
                  contactsData?.map((contact) => (
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="contact-star marked">
                            <span className="feather-icon">
                              {/* <i data-feather="star"></i> */}
                              <FaStar />
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="media align-items-center">
                          <div className="media-head me-2">
                            <div className="avatar avatar-xs avatar-rounded">
                              <img
                                src={contact.avatar}
                                alt="user"
                                className="avatar-img"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <span className="d-block text-high-em">
                              {contact.lastname},{contact.firstname}{" "}
                              {contact.middlename}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-truncate">{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>
                        {contact.tags &&
                          contact.tags.length > 0 &&
                          contact.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="badge badge-soft-danger  my-1  me-2"
                            >
                              {tag.name}
                            </span>
                          ))}
                      </td>
                      <td>{contact.designation}</td>
                      <td>
                        {moment(contact.created_at).format("DD MMM, YYYY")}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex">
                            <a
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-bs-original-title="Archive"
                              href="/"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  {/* <i data-feather="archive"></i> */}
                                  <FaArchive />
                                </span>
                              </span>
                            </a>
                            <a
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                              data-bs-toggle="tooltip"
                              data-placement="top"
                              title=""
                              data-bs-original-title="Edit"
                              // to={`/edit-contact/${contact.id}`}
                              onClick={() => handleToggle(contact.id)}
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  {/* <i data-feather="edit"></i> */}
                                  <FaEdit />
                                </span>
                              </span>
                            </a>
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  {/* <i data-feather="trash"></i> */}
                                  <FaTrash />
                                </span>
                              </span>
                            </button>
                          </div>
                          <div className="dropdown">
                            <button
                              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                              aria-expanded="false"
                              data-bs-toggle="dropdown"
                            >
                              <span className="icon">
                                <span className="feather-icon">
                                  {/* <i data-feather="more-vertical"></i> */}
                                  <FaArrowDown />
                                </span>
                              </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a
                                onClick={() => handleToggle()}
                                className="dropdown-item"
                                // href="edit-contact.html"
                              >
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="edit"></i> */}
                                  <FaEdit />
                                </span>
                                <span>Edit Contact</span>
                              </a>
                              <button
                                onClick={() => handleDeleteContact(contact.id)}
                                className="dropdown-item"
                                href="/"
                              >
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="trash-2"></i> */}
                                  <FaTrash />
                                </span>
                                <span>Delete</span>
                              </button>
                              <a className="dropdown-item" href="/">
                                <span className="feather-icon dropdown-icon">
                                  {/* <i data-feather="copy"></i> */}
                                  <FaCopy />
                                </span>
                                <span>Duplicate</span>
                              </a>
                              <div className="dropdown-divider"></div>
                              <h6 className="dropdown-header dropdown-header-bold">
                                Change Labels
                              </h6>
                              <a className="dropdown-item" href="/">
                                Design
                              </a>
                              <a className="dropdown-item" href="/">
                                Developer
                              </a>
                              <a className="dropdown-item" href="/">
                                Inventory
                              </a>
                              <a className="dropdown-item" href="/">
                                Human Resource
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
